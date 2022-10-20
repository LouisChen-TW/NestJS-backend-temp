import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import {
  QueryFailedError,
  EntityNotFoundError,
  CannotCreateEntityIdMapError,
  TypeORMError,
} from 'typeorm';
@Catch(QueryFailedError, EntityNotFoundError, CannotCreateEntityIdMapError)
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: TypeORMError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let message = exception.message;
    let code = 'HttpException';
    let status = HttpStatus.INTERNAL_SERVER_ERROR;

    switch (exception.name) {
      case 'QueryFailedError':
        status = HttpStatus.UNPROCESSABLE_ENTITY;
        message = exception.message;
        code = (exception as any).code;
        break;
      case 'EntityNotFoundError':
        status = HttpStatus.UNPROCESSABLE_ENTITY;
        message = exception.message;
        code = (exception as any).code;
        break;
      case 'CannotCreateEntityIdMapError':
        status = HttpStatus.UNPROCESSABLE_ENTITY;
        message = exception.message;
        code = (exception as any).code;
        break;
      default:
        status = HttpStatus.INTERNAL_SERVER_ERROR;
    }

    response.status(status).json({
      statusCode: code,
      message: message,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
