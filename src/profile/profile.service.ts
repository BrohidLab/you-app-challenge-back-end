import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Profile } from './profile.schema';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import * as fs from 'fs';
import * as path from 'path';
import { getZodiacAndHoroscope } from 'helper/date-utils';

@Injectable()
export class ProfileService {
  constructor(@InjectModel(Profile.name) private profileModel: Model<Profile>) {}

  async create(userId: string, dto: CreateProfileDto, file?: Express.Multer.File) {
    const profile = new this.profileModel({...dto, userId});
    if (dto.birthday) {
        const bday = new Date(dto.birthday);
        profile.birthday = bday;

        const { zodiac, horoscope } = getZodiacAndHoroscope(bday);
        profile.zodiac = zodiac;
        profile.horoscope = horoscope;
    }

    if (file) profile.photo = file.filename;
    return profile.save();
  }

  async findByUser(userId: string) {
    return this.profileModel.findOne({ userId }).populate('userId', 'username email');
  }

    async update(userId: string, dto: UpdateProfileDto, file?: Express.Multer.File) {
        let profile = await this.profileModel.findOne({ userId });
    
        if (!profile) throw new NotFoundException('Profile not found');

        if (dto.birthday) {
            const bday = new Date(dto.birthday);
            profile.birthday = bday;

            const { zodiac, horoscope } = getZodiacAndHoroscope(bday);
            profile.zodiac = zodiac;
            profile.horoscope = horoscope;
        }

        if (file) {
            if (profile.photo) {
                const oldPath = path.join(process.cwd(), 'uploads', profile.photo);
                if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
            }
            profile.photo = file.filename;
        }

        Object.assign(profile, dto);
        return profile.save();
    }
}
