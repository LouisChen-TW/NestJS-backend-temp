import { NestFactory } from '@nestjs/core';
import session from 'express-session';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { sessionConfig } from './config/session';
import { GlobalExceptionFilter } from './packages/global-exception.filter';
import { ConfigService } from '@nestjs/config';
import { ResponseInterceptor } from './interceptors/response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  app.setGlobalPrefix('/api/v1');
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );
  app.useGlobalFilters(new GlobalExceptionFilter());
  app.use(session(sessionConfig));
  app.useGlobalInterceptors(new ResponseInterceptor());

  await app.listen(configService.get('PORT'));
}
bootstrap();
