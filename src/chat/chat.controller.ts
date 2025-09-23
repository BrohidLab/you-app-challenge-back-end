// src/chat/chat.controller.ts
import { Controller, Get, Param, UseGuards, Request, Post, Body, Query } from '@nestjs/common';
import { ChatService } from './chat.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateMessageDto } from './dto/create-message.dto';
import { GetUser } from 'src/auth/get-user.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('chat')
@UseGuards(AuthGuard('jwt'))
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get('')
  async getUserChats(@GetUser('userId') userId: string) {
    return this.chatService.getUserChats(userId);
  }
  
  @Get('conversation')
  @UseGuards(JwtAuthGuard)
  async getConversation(
    @Query('receiverId') receiverId: string,
    @GetUser('userId') userId: string,
  ) {
    return this.chatService.getConversation(userId, receiverId);
  }


  @Post('send')
  async sendMessage(
    @GetUser() user: any,
    @Body() dto: CreateMessageDto,
  ) {
    return this.chatService.createMessage(user.userId, dto.receiverId, dto.message);
  }

}
