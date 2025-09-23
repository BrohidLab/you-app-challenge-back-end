import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateMessageDto {
    @IsOptional()
    @IsString()
    receiverId?: string;

    @IsOptional()
    @IsString()
    groupId?: string;

    @IsString()
    @IsNotEmpty()
    message: string;
}
