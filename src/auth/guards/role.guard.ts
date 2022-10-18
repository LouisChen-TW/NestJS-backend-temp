import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { Request } from 'express';
import { Observable } from 'rxjs';

import { AuthorizationService } from '../../authorization/authorization.service';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly authorizationService: AuthorizationService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const { user, path, method } = request;

    const action = this.authorizationService.mappingAction(method);

    if (!user) {
      throw new UnauthorizedException();
    }

    return this.authorizationService.checkPermission(
      `role:${(user as any).role}`,
      path,
      action,
    );
  }
}
