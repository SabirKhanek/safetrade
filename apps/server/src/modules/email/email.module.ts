import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path';
@Module({
  imports: [
    ConfigModule,
    MailerModule.forRootAsync({
      useFactory: async (config: ConfigService) => ({
        transport: {
          host: 'smtp.zoho.com',
          auth: {
            user: config.getOrThrow('email.user'),
            pass: config.getOrThrow('email.pass'),
          },
        },
        template: {
          dir: join(__dirname, './templates'),
          adapter: new HandlebarsAdapter({
            default: function (value, defaultValue) {
              return value != null ? value : defaultValue;
            },
            isUndefined: function (value, options) {
              if (typeof value === 'undefined' || value === null) {
                return options.fn(this); // Render the block if value is undefined or null
              } else {
                return options.inverse(this); // Render the inverse block if value is defined
              }
            },
          }),
          options: { strict: true },
        },
        defaults: { from: config.getOrThrow('email.user') },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailModule {}
