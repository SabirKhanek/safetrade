import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { DrizzleService } from 'src/drizzle.service';
import { EmailService } from 'src/email/email.service';
import { AuthMiddleware } from 'src/auth/auth.middleware';
import { EmailModule } from 'src/email/email.module';

@Module({
  controllers: [UsersController],
  imports: [EmailModule],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(UsersController);
  }
}
