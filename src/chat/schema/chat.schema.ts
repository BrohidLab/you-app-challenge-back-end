import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Chat {
  @Prop({ required: true })
  senderId: string;

  @Prop()
  receiverId?: string;

  @Prop()
  groupId?: string;

  @Prop({ required: true })
  message: string;

  @Prop({ default: false })
  isRead: boolean;

  createdAt?: Date;

  updatedAt?: Date;
}


export type ChatDocument = Chat & Document;
export const ChatSchema = SchemaFactory.createForClass(Chat);
