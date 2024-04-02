import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import { openApiDocument } from 'api-contract';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  SwaggerModule.setup('docs', app, openApiDocument);
  await app.listen(3000);
}
bootstrap();
