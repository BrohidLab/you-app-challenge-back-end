// src/chat/chat.gateway.ts
import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { JwtService } from '@nestjs/jwt';
import { ChatService } from './chat.service';
import { CreateMessageDto } from './dto/create-message.dto';

@WebSocketGateway({
  cors: {
    origin: '*', // bisa diubah sesuai frontend
  },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(
    private readonly chatService: ChatService,
    private readonly jwtService: JwtService,
  ) {}

  async handleConnection(client: Socket) {
    try {
      const token = client.handshake.auth?.token || client.handshake.headers['authorization'];
      if (!token) {
        client.disconnect();
        return;
      }

      const decoded = this.jwtService.verify(token.replace('Bearer ', ''));
      (client as any).user = decoded;
      console.log(`✅ Client connected: ${decoded.username}`);
    } catch (err) {
      console.log('❌ Invalid token, disconnecting client');
      client.disconnect();
    }
  }

  async handleDisconnect(client: Socket) {
    console.log('❌ Client disconnected');
  }

  @SubscribeMessage('sendMessage')
  async handleSendMessage(
    @MessageBody() dto: CreateMessageDto,
    @ConnectedSocket() client: Socket,
  ) {
    const user = (client as any).user;
    if (!user) return;

    const message = await this.chatService.createMessage(
      user.sub, // senderId dari token
      dto.receiverId,
      dto.message,
    );

    // kirim ke receiver
    this.server.to(dto.receiverId).emit('receiveMessage', message);

    // balikin juga ke sender (biar update chat realtime)
    client.emit('receiveMessage', message);
  }
}
