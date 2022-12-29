import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('Demo')
  .setDescription('The demo API description')
  .setVersion('1.0')
  .addServer('/api/v1')
  .addBearerAuth()
  .build();
