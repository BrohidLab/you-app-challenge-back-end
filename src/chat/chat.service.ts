import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Chat, ChatDocument } from './schema/chat.schema';
import { Group, GroupDocument } from './schema/group.schema';

@Injectable()
export class ChatService {
  constructor(
    @InjectModel(Chat.name) private chatModel: Model<ChatDocument>,
    @InjectModel(Group.name) private groupModel: Model<GroupDocument>,
  ) {}

  async getChatList(userId: string) {
    const personalChats = await this.chatModel
      .find({
        $or: [{ senderId: userId }, { receiverId: userId }],
      })
      .sort({ updatedAt: -1 })
      .lean();

    const groupChats = await this.groupModel
      .find({ members: userId })
      .sort({ updatedAt: -1 })
      .lean();

    const formattedPersonal = personalChats.map((chat) => ({
      type: 'personal',
      chatId: chat._id,
      lastMessage: chat.message,
      unreadCount: chat.isRead ? 0 : 1,
      updatedAt: chat.updatedAt ?? chat.createdAt,
      participant: chat.senderId === userId ? chat.receiverId : chat.senderId,
    }));

    const formattedGroup = groupChats.map((group) => ({
      type: 'group',
      chatId: group._id,
      lastMessage: group.lastMessage ?? null,
      unreadCount: 0,
      updatedAt: group.updatedAt ?? group.createdAt,
      group: {
        groupId: group._id,
        name: group.name,
        members: group.members,
      },
    }));

    return {
      chats: [...formattedPersonal, ...formattedGroup].sort(
        (a, b) => +new Date(b.updatedAt) - +new Date(a.updatedAt),
      ),
    };
  }


  async getConversation(user1: string, user2: string) {
    return this.chatModel
      .find({
        type: 'personal',
        $or: [
          { senderId: user1, receiverId: user2 },
          { senderId: user2, receiverId: user1 },
        ],
      })
      .sort({ createdAt: 1 });
  }

  async createMessage(senderId: string, receiverId: string, message: string) {
    const chat = new this.chatModel({
      senderId,
      receiverId,
      message,
      type: 'personal',
    });
    return chat.save();
  }

  async createGroup(name: string, members: string[], creatorId: string) {
    const group = new this.groupModel({
      name,
      members,
      admins: [creatorId],
    });
    return group.save();
  }

  async getUserGroups(userId: string) {
    return this.groupModel.find({ members: userId });
  }

  async addMemberGroup(groupId: string, userId: string) {
    const group = await this.groupModel.findById(groupId);
    if (!group) throw new NotFoundException('Group not found');

    if (!group.members.includes(userId)) {
      group.members.push(userId);
    }
    return group.save();
  }

  async removeMember(groupId: string, userId: string) {
    const group = await this.groupModel.findById(groupId);
    if (!group) throw new NotFoundException('Group not found');

    group.members = group.members.filter((id) => id !== userId);
    return group.save();
  }

  async getGroupMessages(groupId: string) {
    return this.chatModel
      .find({ groupId, type: 'group' })
      .sort({ createdAt: 1 });
  }

  async createGroupMessage(senderId: string, groupId: string, message: string) {
    const group = await this.groupModel.findById(groupId);
    if (!group) throw new NotFoundException('Group not found');

    const chat = new this.chatModel({
      senderId,
      groupId,
      message,
      type: 'group',
    });

    const savedChat = await chat.save();

    await this.groupModel.findByIdAndUpdate(groupId, {
      $set: { 
        lastMessage: message,
        updatedAt: new Date() },
    });

    return savedChat;
  }

  async getUnreadMessages(userId: string) {
    return this.chatModel.find({ receiverId: userId, isRead: false }).sort({ createdAt: -1 });
  }

  async markAsRead(senderId: string, receiverId: string) {
    return this.chatModel.updateMany(
      { senderId, receiverId, isRead: false },
      { $set: { isRead: true } },
    );
  }
}
