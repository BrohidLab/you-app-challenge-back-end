import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Group {
    @Prop({ required: true })
    name: string;

    @Prop({ type: [String], default: [] })
    members: string[];

    @Prop()
    lastMessage?: string;

    createdAt?: Date;
    
    updatedAt?: Date;
}


export type GroupDocument = Group & Document;
export const GroupSchema = SchemaFactory.createForClass(Group);
