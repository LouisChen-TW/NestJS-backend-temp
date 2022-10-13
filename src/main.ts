import { NestFactory } from '@nestjs/core';
import session from 'express-session';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { sessionConfig } from './config/session';
import { GlobalExceptionFilter } from './packages/global-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/api/v1');
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalFilters(new GlobalExceptionFilter());
  app.use(session(sessionConfig));

  await app.listen(3000);
}
bootstrap();
