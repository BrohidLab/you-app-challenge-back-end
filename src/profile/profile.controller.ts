import {
  Body,
  Controller,
  Get,
  Put,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  Req,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ProfileResponseDto } from './dto/profile-respone.dto';

@ApiTags('Profile')
@ApiBearerAuth()
@Controller('profile')
export class ProfileController {
    constructor(private readonly profileService: ProfileService) {}

    @UseGuards(JwtAuthGuard)
    @Post('create')
    @ApiOperation({ summary: 'Buat profile baru untuk user yang login' })
    @ApiConsumes('multipart/form-data')
    @ApiBody({ type: CreateProfileDto })
    @ApiResponse({
        status: 201,
        description: 'Profile berhasil dibuat',
        type: ProfileResponseDto,
    })
    @ApiResponse({ status: 400, description: 'Validasi gagal' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({ status: 500, description: 'Internal server error' })
    @UseInterceptors(
        FileInterceptor('photo', {
            storage: diskStorage({
                destination: './uploads',
                filename: (_req, file, cb) => {
                const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
                cb(null, unique + extname(file.originalname));
                },
            }),
        }),
    )
    create(
    @Body() dto: CreateProfileDto,
    @UploadedFile() file: Express.Multer.File,
    @Req() req,
    ) {
        return this.profileService.create(req.user.userId, dto, file);
    }


    @UseGuards(JwtAuthGuard)
    @Get('me')
    @ApiOperation({ summary: 'Ambil profile milik user yang sedang login' })
    @ApiResponse({
        status: 200,
        description: 'Profile ditemukan',
        type: ProfileResponseDto,
    })
    getMyProfile(@Req() req) {
        return this.profileService.findByUser(req.user.userId);
    }

    @UseGuards(JwtAuthGuard)
    @Put('update')
    @ApiOperation({ summary: 'Update profile milik user yang login' })
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        type: UpdateProfileDto,
    })
    @ApiResponse({
        status: 200,
        description: 'Profile berhasil diupdate',
        type: ProfileResponseDto,
    })
    @UseInterceptors(
        FileInterceptor('photo', {
            storage: diskStorage({
            destination: './uploads',
            filename: (_req, file, cb) => {
                const unique =
                Date.now() + '-' + Math.round(Math.random() * 1e9);
                cb(null, unique + extname(file.originalname));
            },
            }),
        }),
    )
    updateMyProfile(
        @Req() req,
        @Body() dto: UpdateProfileDto,
        @UploadedFile() file: Express.Multer.File,
    ) {
        return this.profileService.update(req.user.userId, dto, file);
    }
}
