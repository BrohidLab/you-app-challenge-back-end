import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { RegisterUserDto } from './register-users.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post('register')
    async register(@Body() dto: RegisterUserDto) {
        return this.usersService.create(dto);
    }
  
    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Req() req) {
      return req.user;
    }
}
