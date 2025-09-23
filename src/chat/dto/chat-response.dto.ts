import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ChatResponseDto {
    @ApiProperty({ example: '64f1a2c7b4d2f9a3e6b7c8d9' })
    _id: string;

    @ApiProperty({ example: '64f1a2c7b4d2f9a3e6b7c8a0' })
    senderId: string;

    @ApiPropertyOptional({ example: '64f1a2c7b4d2f9a3e6b7c8a1' })
    receiverId?: string;

    @ApiPropertyOptional({ example: '64f1a2c7b4d2f9a3e6b7c8a2' })
    groupId?: string;

    @ApiProperty({ example: 'Halo, apa kabar?' })
    message: string;

    @ApiProperty({ example: 'personal', enum: ['personal', 'group'] })
    type: string;

    @ApiProperty({ example: false })
    read: boolean;

    @ApiProperty({ example: '2025-09-17T10:15:30.000Z' })
    createdAt: Date;

    @ApiProperty({ example: '2025-09-17T10:15:30.000Z' })
    updatedAt: Date;
}
