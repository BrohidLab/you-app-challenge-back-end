import { 
  Controller, Get, Param, UseGuards, Request, Post, Body, Query, BadRequestException, Req 
} from '@nestjs/common';
import { ChatService } from './chat.service';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { 
  ApiBearerAuth,
  ApiBody, ApiOperation, ApiResponse, ApiTags 
} from '@nestjs/swagger';
import { ChatResponseDto } from './dto/chat-response.dto';
import { ChatListResponseDto } from './dto/chat-list-response.dto';
import { GroupResponseDto } from './dto/group-response.dto';
import { NotificationResponseDto } from './dto/notification-response.dto';
import { PersonalMessageDto } from './dto/personal-message-response.dto';
import { MarkAsReadResponseDto } from './dto/read-message-response.dto';
import { CreateGroupDto } from './dto/create-group.dto';

@ApiTags('Chat')
@ApiBearerAuth('access-token')
@Controller('chat')
@UseGuards(AuthGuard('jwt'))
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  
  @Get('list')
  @ApiOperation({ summary: 'Ambil daftar chat user' })
  @ApiResponse({ status: 200, type: [ChatListResponseDto] })
  async getChatList(@GetUser() user) {
    return this.chatService.getChatList(user.userId);
  }
  
  @Get('conversation')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Ambil percakapan personal dengan user lain' })
  @ApiResponse({ status: 200, type: PersonalMessageDto })
  async getConversation(
    @Query('receiverId') receiverId: string,
    @GetUser('userId') userId: string,
  ) {
    return this.chatService.getConversation(userId, receiverId);
  }

  @Post('send/personal')
  @ApiOperation({ summary: 'Kirim pesan personal' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        receiverId: { type: 'string', example: '650a8f7bc9e9d1c3fbd1b456' },
        message: { type: 'string', example: 'Halo, ini pesan personal!' },
      },
      required: ['receiverId', 'message'],
    },
  })
  @ApiResponse({ status: 201, type: ChatResponseDto })
  async sendPersonalMessage(
    @GetUser() user, 
    @Body() body: { receiverId: string; message: string }
  ) {
    return this.chatService.createMessage(user.userId, body.receiverId, body.message);
  }

  @Post('send/group')
  @ApiOperation({ summary: 'Kirim pesan ke group' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        groupId: { type: 'string', example: '651b9e8ac4d2e1c3fbd7e567' },
        message: { type: 'string', example: 'Halo group!' },
      },
      required: ['groupId', 'message'],
    },
  })
  @ApiResponse({ status: 201, type: ChatResponseDto })
  async sendGroupMessage(
    @GetUser() user, 
    @Body() body: { groupId: string; message: string }
  ) {
    return this.chatService.createGroupMessage(user.userId, body.groupId, body.message);
  }

  @Post('group/create')
  @ApiOperation({ summary: 'Buat group baru' })
  @ApiResponse({ status: 201, type: GroupResponseDto })
  async createGroup(
    @Req() req, 
    @Body() dto: CreateGroupDto
  ) {
    return this.chatService.createGroup(dto.name, dto.members, req.user.userId);
  }

  @Get('group/:id/messages')
  @ApiOperation({ summary: 'Ambil semua pesan dari group' })
  @ApiResponse({ status: 200, type: [ChatResponseDto] })
  async getGroupMessages(@Param('id') groupId: string) {
    return this.chatService.getGroupMessages(groupId);
  }

  @Post('group/:id/add-member')
  @ApiOperation({ summary: 'Tambah member ke group' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        userId: {
          type: 'string',
          example: '650a8f7bc9e9d1c3fbd1b456',
          description: 'ID user yang akan ditambahkan',
        },
      },
      required: ['userId'],
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Berhasil menambahkan member ke group',
    type: GroupResponseDto,
  })
  async addMember(@Param('id') groupId: string, @Body('userId') userId: string) {
    return this.chatService.addMemberGroup(groupId, userId);
  }


  @Post('group/:id/remove-member')
  @ApiOperation({ summary: 'Hapus member dari group' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        userId: {
          type: 'string',
          example: '650a8f7bc9e9d1c3fbd1b456',
          description: 'ID user yang akan dihapus',
        },
      },
      required: ['userId'],
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Berhasil menghapus member dari group',
    type: GroupResponseDto,
  })
  async removeMember(@Param('id') groupId: string, @Body('userId') userId: string) {
    return this.chatService.removeMember(groupId, userId);
  }


  @Get('notifications')
  @ApiOperation({ summary: 'Ambil daftar pesan yang belum dibaca' })
  @ApiResponse({ status: 200, type: [NotificationResponseDto] })
  async getUnreadMessages(@GetUser('userId') userId: string) {
    return this.chatService.getUnreadMessages(userId);
  }

  @Post('read/:senderId')
  @ApiOperation({ summary: 'Tandai pesan dari user tertentu sebagai sudah dibaca' })
  @ApiResponse({ status: 200, type: MarkAsReadResponseDto })
  async markMessagesAsRead(
    @GetUser('userId') userId: string,
    @Param('senderId') senderId: string,
  ) {
    return this.chatService.markAsRead(senderId, userId);
  }

}
