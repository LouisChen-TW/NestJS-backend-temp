import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { TypeOrmConfigService } from './config/typeorm';
import { AuthModule } from './auth/auth.module';

import { RouterModule } from '@nestjs/core';
import { UsersModule } from './users/users.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
    RouterModule.register([
      {
        path: 'users',
        module: UsersModule,
        children: [
          {
            path: 'auth',
            module: AuthModule,
          },
        ],
      },
    ]),
    AuthModule,
    UsersModule,
  ],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
