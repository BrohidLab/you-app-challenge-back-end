import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  Req,
  Put,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('profile')
export class ProfileController {
    constructor(private readonly profileService: ProfileService) {}

    @UseGuards(JwtAuthGuard)
    @Post('create')
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
    create(@Body() dto: CreateProfileDto, @UploadedFile() file: Express.Multer.File, @Req() req) {
        return this.profileService.create(req.user.userId, dto, file);
    }

    @UseGuards(JwtAuthGuard)
    @Get('me')
    getMyProfile(@Req() req) {
        return this.profileService.findByUser(req.user.userId);
    }

    @UseGuards(JwtAuthGuard)
    @Put('update')
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
    updateMyProfile(
        @Req() req,
        @Body() dto: UpdateProfileDto,
        @UploadedFile() file: Express.Multer.File,
    ) {
        return this.profileService.update(req.user.userId, dto, file);
    }
}
