import { ApiProperty } from '@nestjs/swagger';

export class PersonalMessageDto {
  @ApiProperty({ example: '650a8f7bc9e9d1c3fbd1b456' })
  senderId: string;

  @ApiProperty({ example: 'Halo, ini pesan!' })
  message: string;

  @ApiProperty({ example: '2025-09-17T12:30:00.000Z' })
  createdAt: Date;
}

export class ConversationResponseDto {
  @ApiProperty({ type: [PersonalMessageDto] })
  messages: PersonalMessageDto[];
}
