import { Controller, Get, Param, UseGuards, Request, Post, Body, Query, BadRequestException, Req } from '@nestjs/common';
import { ChatService } from './chat.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateMessageDto } from './dto/create-message.dto';
import { GetUser } from 'src/auth/get-user.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('chat')
@UseGuards(AuthGuard('jwt'))
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get('list')
  async getChatList(@GetUser() user) {
    return this.chatService.getChatList(user.userId);
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
  async sendMessage(@GetUser() user, @Body() dto: CreateMessageDto) {
    if (dto.receiverId) {
      return this.chatService.createMessage(user.userId, dto.receiverId, dto.message);
    } else if (dto.groupId) {
      return this.chatService.createGroupMessage(user.userId, dto.groupId, dto.message);
    } else {
      throw new BadRequestException('receiverId or groupId is required');
    }
  }

  @Post('group/create')
  async createGroup(@Req() req, @Body() dto: { name: string; members: string[] }) {
    return this.chatService.createGroup(dto.name, dto.members, req.user.userId);
  }

  @Get('group/:id/messages')
  async getGroupMessages(@Param('id') groupId: string) {
    return this.chatService.getGroupMessages(groupId);
  }

  @Post('group/:id/add-member')
  async addMember(@Param('id') groupId: string, @Body('userId') userId: string) {
    return this.chatService.addMemberGroup(groupId, userId);
  }

  @Post('group/:id/remove-member')
  async removeMember(@Param('id') groupId: string, @Body('userId') userId: string) {
    return this.chatService.removeMember(groupId, userId);
  }

  @Get('notifications')
  async getUnreadMessages(@GetUser('userId') userId: string) {
    return this.chatService.getUnreadMessages(userId);
  }

  @Post('read/:senderId')
  async markMessagesAsRead(
    @GetUser('userId') userId: string,
    @Param('senderId') senderId: string,
  ) {
    return this.chatService.markAsRead(senderId, userId);
  }

}
