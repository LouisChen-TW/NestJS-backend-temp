import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { Request } from 'express';
import { Observable } from 'rxjs';
import { bypassAuth } from '../../decorators/bypass.decorator';

import { AuthorizationService } from '../../users/authorization/authorization.service';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private readonly authorizationService: AuthorizationService,
    private reflector: Reflector,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const { user, path, method } = request;

    if (!user && bypassAuth(context, this.reflector)) {
      return true;
    }

    if (!user) {
      throw new UnauthorizedException();
    }

    return this.authorizationService.checkPermission(
      `${(user as any).userId}`,
      path,
      method.toLowerCase(),
    );
  }
}
