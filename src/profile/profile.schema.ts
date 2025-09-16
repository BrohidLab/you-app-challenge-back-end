import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
}


@Schema({ timestamps: true })
export class Profile extends Document {
    @Prop({ required: true })
    name: string;

    @Prop({ enum: Gender, required: true })
    gender: Gender;

    @Prop({ type: Date, required: true })
    birthday: Date;

    @Prop()
    zodiac: string;

    @Prop()
    horoscope: string;

    @Prop()
    height?: number;

    @Prop()
    weight?: number;

    @Prop([String])
    interest: string[];

    @Prop()
    photo?: string;

    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    userId: string;
}


export const ProfileSchema = SchemaFactory.createForClass(Profile);
