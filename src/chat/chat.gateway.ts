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
    origin: '*',
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
      console.log(`Client connected: ${decoded.username}`);
    } catch (err) {
      console.log('Invalid token, disconnecting client');
      client.disconnect();
    }
  }

  async handleDisconnect(client: Socket) {
    console.log('Client disconnected');
  }

  @SubscribeMessage('sendMessage')
  async handleSendMessage(
    @MessageBody() dto: CreateMessageDto,
    @ConnectedSocket() client: Socket,
  ) {
    const user = (client as any).user;
    if (!user) return;

    let message;

    if (dto.receiverId) {
      message = await this.chatService.createMessage(
        user.userId,
        dto.receiverId,
        dto.message,
      );
      this.server.to(dto.receiverId).emit('receiveMessage', message);
    } 
    else if (dto.groupId) {
      message = await this.chatService.createGroupMessage(
        user.userId,
        dto.groupId,
        dto.message,
      );

      this.server.to(dto.groupId).emit('receiveGroupMessage', message);
    } 
    else {
      client.emit('error', { message: 'receiverId or groupId is required' });
      return;
    }

    client.emit('receiveMessage', message);
  }

}
