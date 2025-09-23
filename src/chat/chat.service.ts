import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Chat, ChatDocument } from './schema/chat.schema';

@Injectable()
export class ChatService {
  constructor(
    @InjectModel(Chat.name) private chatModel: Model<ChatDocument>,
  ) {}

  async getUserChats(userId: string) {
    const chats = await this.chatModel
      .find({
        $or: [{ senderId: userId }, { receiverId: userId }],
      })
      .sort({ createdAt: -1 })
      .lean();

    const conversations = new Map<string, any>();

    chats.forEach(chat => {
      const partnerId =
        chat.senderId === userId ? chat.receiverId : chat.senderId;

      if (!conversations.has(partnerId)) {
        conversations.set(partnerId, chat);
      }
    });

    return Array.from(conversations.values());
  }

  async getConversation(user1: string, user2: string) {
    return this.chatModel.find({
      $or: [
        { senderId: user1, receiverId: user2 },
        { senderId: user2, receiverId: user1 },
      ],
    }).sort({ createdAt: 1 });
  }

  async createMessage(senderId: string, receiverId: string, message: string) {
    const chat = new this.chatModel({ senderId, receiverId, message });
    return chat.save();
  }
}
