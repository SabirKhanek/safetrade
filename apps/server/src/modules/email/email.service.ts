import { ISendMailOptions, MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EmailService {
  constructor(
    private mailer: MailerService,
    private config: ConfigService,
  ) {}

  async sendMail(
    to: string,
    {
      template,
      subject,
      attachments,
      templateArgs,
    }: {
      template: string;
      attachments?: ISendMailOptions['attachments'];
      subject?: string;
      templateArgs?: { [key: string]: string };
    },
  ) {
    await this.mailer.sendMail({
      template,
      to,
      subject,
      attachments,
      context: { host: this.config.get('host'), email: to, ...templateArgs },
    });
  }
}
