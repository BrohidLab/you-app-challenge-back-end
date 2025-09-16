import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './users.schema';
import * as bcrypt from 'bcrypt';
import { RegisterUserDto } from './register-users.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(dto: RegisterUserDto) {

    if (dto.password !== dto.passwordConfirm) {
      throw new BadRequestException('Password confirmation does not match');
    }

    const hashed = await bcrypt.hash(dto.password, 10);
    const user = new this.userModel({
      ...dto,
      password: hashed,
    });
    const saved = await user.save();

    return {
      message: 'User registered successfully',
      data: {
        id: saved._id,
        username: saved.username,
        email: saved.email,
      },
    };
  }

  async findByEmailOrUsername(username: string) {
    return this.userModel.findOne({
      $or: [{ email: username }, { username: username }],
    }).exec();
  }
}
