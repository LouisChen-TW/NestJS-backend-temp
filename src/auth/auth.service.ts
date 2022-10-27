import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(account: string, pass: string): Promise<User> {
    const user = await this.usersService.findUser(account);
    if (!user) throw new UnauthorizedException('帳號或密碼錯誤');
    const isMatch = await bcrypt.compare(pass, user.password);
    if (!isMatch) throw new UnauthorizedException('帳號或密碼錯誤');
    delete user.password;

    return user;
  }

  async login(user) {
    const payload = {
      userId: user.id,
      account: user.account,
      email: user.email,
      role: user.role,
      isEnabled: user.isEnabled,
    };

    return {
      access_token: this.jwtService.sign(payload),
      uid: payload.userId,
    };
  }
}
