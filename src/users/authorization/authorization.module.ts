import { DynamicModule, Module } from '@nestjs/common';
import { newEnforcer } from 'casbin';
import TypeORMAdapter from 'typeorm-adapter';
import { AUTHORIZATION_ENFORCER } from './token.const';
import { RegisterOptions } from './option.interface';
import { AuthorizationService } from './authorization.service';
import { AuthzController } from './authorization.controller';
import { UsersService } from '../users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { UserInfo } from '../entities/user-info.entity';
import { ConfigModule } from '@nestjs/config';
import { POLICIES } from './policies.const';

@Module({
  controllers: [AuthzController],
  providers: [UsersService],
  imports: [TypeOrmModule.forFeature([User, UserInfo]), ConfigModule.forRoot()],
})
export class AuthorizationModule {
  static async register(options: RegisterOptions): Promise<DynamicModule> {
    const { modelPath, global = false } = options;

    const typeORMAdapter = await TypeORMAdapter.newAdapter({
      type: 'mysql',
      host: process.env.MYSQL_HOST,
      port: +process.env.MYSQL_PORT,
      username: process.env.MYSQL_USERNAME,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
    });
    const policies = POLICIES;
    const providers = [
      {
        provide: AUTHORIZATION_ENFORCER,
        useFactory: async () => {
          const enforcer = await newEnforcer(modelPath, typeORMAdapter);
          const existedPolicies = await enforcer.getPolicy();
          // 將所有既有的policies刪除
          await enforcer.removePolicies(existedPolicies);
          // 將所有新policies加入到資料庫
          await enforcer.addPolicies(policies);
          // 將admin權限帶給admin角色
          await enforcer.addRoleForUser('ADMIN', 'admin');
          return enforcer;
        },
      },
      AuthorizationService,
    ];

    return {
      global,
      providers,
      module: AuthorizationModule,
      exports: [...providers],
    };
  }
}
