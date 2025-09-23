import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string) {
    const user = await this.usersService.findByEmailOrUsername(username);
    if (!user) throw new UnauthorizedException('Data not found');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new UnauthorizedException('Invalid credentials');

    const { password: _, ...result } = user.toObject();
    return result;
  }

  async login(user: any) {
    const payload = { sub: user._id, username: user.username, email: user.email };
    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }

}
