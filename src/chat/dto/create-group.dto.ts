import { ApiProperty } from '@nestjs/swagger';

export class CreateGroupDto {
  @ApiProperty({ example: 'Group Challenge Back End', description: 'Nama grup' })
  name: string;

  @ApiProperty({
    example: ['user1-id', 'user2-id'],
    description: 'Daftar member userId',
    type: [String],
  })
  members: string[];
}
