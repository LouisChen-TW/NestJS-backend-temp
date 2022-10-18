import { DynamicModule, Module } from '@nestjs/common';

import { newEnforcer } from 'casbin';

import { AUTHORIZATION_ENFORCER } from './token.const';
import { RegisterOptions } from './option.interface';

import { AuthorizationService } from './authorization.service';

@Module({})
export class AuthorizationModule {
  static register(options: RegisterOptions): DynamicModule {
    const { modelPath, policyAdapter, global = false } = options;
    const providers = [
      {
        provide: AUTHORIZATION_ENFORCER,
        useFactory: async () => {
          const enforcer = await newEnforcer(modelPath, policyAdapter);
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
