import { ApiProperty } from '@nestjs/swagger';

export class UserRegisterResponse {
  @ApiProperty({ example: '68c84ccfe4d1f24122923416' })
  _id: string;

  @ApiProperty({ example: 'Sahid' })
  username: string;

  @ApiProperty({ example: 'sahid@gmail.com' })
  email: string;

  @ApiProperty({ example: '2025-09-15T17:28:47.072Z' })
  createdAt: string;

  @ApiProperty({ example: '2025-09-15T17:28:47.072Z' })
  updatedAt: string;
}
