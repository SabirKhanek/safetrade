import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { DrizzleService } from './drizzle.service';
@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'admin', 'dist'),
      exclude: ['/api/(.*)', '/docs'],
    }),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService, DrizzleService],
})
export class AppModule {}
