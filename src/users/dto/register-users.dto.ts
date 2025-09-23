import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class RegisterUserDto {
  @ApiProperty({ example: 'example', description: 'Username unik untuk user' })
  @IsNotEmpty()
  username: string;

  @ApiProperty({ example: 'example@mail.com', description: 'Email valid' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'password123', description: 'Password minimum 6 karakter' })
  @MinLength(6)
  password: string;

  @ApiProperty({ example: 'password123', description: 'Password konfirmasi harus sama dengan password' })
  @IsNotEmpty({ message: 'Please confirm your password' })
  passwordConfirm: string;
}
