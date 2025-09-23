// src/chat/dto/create-message.dto.ts
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateMessageDto {
    @IsString()
    @IsNotEmpty()
    receiverId: string; // bisa userId atau groupId

    @IsString()
    @IsNotEmpty()
    message: string;
}
