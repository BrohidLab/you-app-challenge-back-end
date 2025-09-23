import { ApiProperty } from '@nestjs/swagger';

export class NotificationResponseDto {
    @ApiProperty({ example: '650a8f7bc9e9d1c3fbd1b456' })
    senderId: string;

    @ApiProperty({ example: 5 })
    unreadCount: number;
}
