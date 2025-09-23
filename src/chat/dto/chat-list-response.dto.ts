import { ApiProperty } from '@nestjs/swagger';

export class ChatListResponseDto {
    @ApiProperty({ example: '650a8f7bc9e9d1c3fbd1b456' })
    chatId: string;

    @ApiProperty({ example: '650a8f7bc9e9d1c3fbd1b789' })
    userId: string;

    @ApiProperty({ example: 'John Doe' })
    name: string;

    @ApiProperty({ example: 'Halo, apa kabar?' })
    lastMessage: string;

    @ApiProperty({ example: '2025-09-17T12:00:00.000Z' })
    updatedAt: Date;
}
