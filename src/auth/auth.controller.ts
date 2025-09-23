import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginResponseDto } from './dto/auth-login-response.dto';
import { LoginRequestDto } from './dto/login.dto';

@ApiTags('Auth')
@Controller('users')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    @ApiOperation({ summary: 'Login user' })
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                username: {
                    type: 'string',
                    example: 'exampleUser',
                    description: 'Username atau email user',
                },
                password: {
                    type: 'string',
                    example: 'password123',
                    description: 'Password user',
                },
            },
            required: ['username', 'password'],
        },
    })
    @ApiResponse({
        status: 200,
        description: 'Berhasil login dan mendapatkan token',
        type: LoginResponseDto,
    })
    @ApiResponse({
        status: 401,
        description: 'Username atau password salah',
    })
    async login(@Body() dto: LoginRequestDto) {
        const user = await this.authService.validateUser(dto.username, dto.password);
        return this.authService.login(user);
    }
}
