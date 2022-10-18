import { Module } from '@nestjs/common';

import { AuthService } from '../auth/auth.service';
import { JwtService } from '@nestjs/jwt';

import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

import { UserInfo } from './entities/user-info.entity';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { AuthorizationModule } from '../authorization/authorization.module';
import { join } from 'path';
@Module({
  imports: [
    TypeOrmModule.forFeature([User, UserInfo]),
    AuthorizationModule.register({
      modelPath: join(__dirname, '../../rbac/model.conf'),
      policyAdapter: join(__dirname, '../../rbac/policy.csv'),
    }),
  ],
  providers: [UsersService, AuthService, JwtService],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
