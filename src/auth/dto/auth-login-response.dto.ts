import { ApiProperty } from '@nestjs/swagger';

export class LoginResponseDto {
  @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6...' })
  access_token: string;

  @ApiProperty({
    example: {
      _id: '68c84ccfe4d1f24122923416',
      username: 'sahid',
      email: 'sahid@gmail.com',
    },
  })
  user: {
    _id: string;
    username: string;
    email: string;
  };
}
