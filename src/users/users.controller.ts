import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { RegisterUserDto } from './dto/register-users.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserRegisterResponse } from './dto/auth-register-response.dto';

@ApiTags('Auth')
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post('register')
    @ApiOperation({ summary: 'Register user baru' })
    @ApiResponse({ status: 201, description: 'User berhasil didaftarkan', type: UserRegisterResponse })

    @ApiResponse({ status: 400, description: 'Bad Request' })
    async register(@Body() dto: RegisterUserDto) {
        return this.usersService.create(dto);
    }
  
    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Req() req) {
      return req.user;
    }
}
