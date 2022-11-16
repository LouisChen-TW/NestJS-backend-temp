import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { AuthModule } from './auth/auth.module';

import { APP_INTERCEPTOR, RouterModule } from '@nestjs/core';
import { UsersModule } from './users/users.module';
import { AuthorizationModule } from './users/authorization/authorization.module';
import { WinstonModule } from 'nest-winston';
import { WinstonConfigService } from './config/winston';
import { LoggerInterceptor } from './interceptors/logger.interceptor';
import { configValidation } from './config/config.validation';
import { join } from 'path';
import { typeormOptions } from '../database/data-source';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `${process.cwd()}/env/.env.${process.env.NODE_ENV}`,
      isGlobal: true,
      cache: true,
      validationSchema: configValidation,
    }),
    TypeOrmModule.forRoot(typeormOptions),
    RouterModule.register([
      {
        path: 'users',
        module: UsersModule,
        children: [
          {
            path: 'auth',
            module: AuthModule,
          },
          {
            path: 'authz',
            module: AuthorizationModule,
          },
        ],
      },
    ]),
    WinstonModule.forRootAsync({ useClass: WinstonConfigService }),
    AuthModule,
    UsersModule,
    AuthorizationModule.register({
      modelPath: join(__dirname, '../rbac/model.conf'),
      // policyAdapter: join(__dirname, '../src/rbac/policy.csv'),
      global: true,
    }),
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggerInterceptor,
    },
  ],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
