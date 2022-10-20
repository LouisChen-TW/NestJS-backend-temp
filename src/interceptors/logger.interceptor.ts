import {
  CallHandler,
  ExecutionContext,
  Inject,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { nanoid } from 'nanoid';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Observable, tap } from 'rxjs';
import { Logger } from 'winston';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();
    const methodName = context.getHandler();
    const className = context.getClass();
    const req = context.switchToHttp().getRequest();

    const loggerOptions = {
      pid: nanoid(),
      class: className,
      method: methodName,
      action: req.method,
      url: req.protocol + '://' + req.get('host') + req.originalUrl,
      body: req.body,
      params: req.params,
      query: req.query,
      clientIP: req.ip,
    };

    return next.handle().pipe(
      tap({
        next: () =>
          this.logger.info({
            ...loggerOptions,
            duration: `${Date.now() - now} ms`,
          }),
        error: (err) => {
          this.logger.error({
            ...loggerOptions,
            duration: `${Date.now() - now} ms`,
            err,
          });
        },
      }),
    );
  }
}
