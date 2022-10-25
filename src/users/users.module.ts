import { Module } from '@nestjs/common';

import { AuthService } from '../auth/auth.service';
import { JwtService } from '@nestjs/jwt';

import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

import { UserInfo } from './entities/user-info.entity';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserInfo])],
  providers: [UsersService, AuthService, JwtService],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
