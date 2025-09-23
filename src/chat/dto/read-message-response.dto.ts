import { ApiProperty } from '@nestjs/swagger';

export class MarkAsReadResponseDto {
  @ApiProperty({ example: '650a8f7bc9e9d1c3fbd1b456' })
  senderId: string;

  @ApiProperty({ example: true })
  success: boolean;

  @ApiProperty({ example: 'All messages marked as read' })
  message: string;
}
