import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import { openApiDocument } from 'api-contract';
import cookie_parser from 'cookie-parser';
import configuration from './config/configuration';
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      credentials: true,
      origin: [
        `http://${configuration().domain}`,
        'http://localhost:3001',
        'https://api.safetrade.cloud',
      ],
    },
  });
  app.use(cookie_parser());
  app.use((req, res, next) => {
    req['x-forwarded-for'] = (req['x-forwarded-for'] || '').split(',').at(0);
    next();
  });
  // @ts-ignore
  app.set('trust proxy', 1);
  // app.enableCors();
  SwaggerModule.setup('docs', app, openApiDocument, {
    swaggerOptions: {
      withCredentials: true,
    },
  });
  await app.listen(3000);
}
bootstrap();
