import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LoginRequestDto {
  @ApiProperty({
    example: 'exampleUser',
    description: 'Username atau email user',
  })
  @IsString()
  username: string;

  @ApiProperty({
    example: 'password123',
    description: 'Password user',
  })
  @IsString()
  password: string;
}
