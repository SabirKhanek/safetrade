import {
  BadRequestException,
  Controller,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ChatService } from './chat.service';
import { TsRestHandler, tsRestHandler } from '@ts-rest/nest';
import { contract } from 'api-contract';
import { UserJwtAuthGuard } from '../user-auth/strategies/guards/jwt.guard';
import { Request } from 'express';

@Controller({})
export class ChatController {
  constructor(private chatService: ChatService) {}

  @TsRestHandler(contract.chat.initThread)
  @UseGuards(UserJwtAuthGuard)
  async initThread(@Req() req: Request) {
    return tsRestHandler(contract.chat.initThread, async ({ body }) => {
      console.log(req.user, 'authenticated');
      if (req.user.email === body.participant) {
        throw new BadRequestException(
          'You cant generate a thread with yourself',
        );
      }
      const res = await this.chatService.initThread(
        req.user.user_uid,
        body.participant,
      );
      return {
        status: 200,
        body: { success: true, message: 'Thread Initiated', thread_id: res },
      };
    });
  }

  @TsRestHandler(contract.chat.sendMessge)
  @UseGuards(UserJwtAuthGuard)
  async sendMessage(@Req() req: Request) {
    return tsRestHandler(contract.chat.sendMessge, async ({ body }) => {
      const res = await this.chatService.sendMessage(
        req.user.user_uid,
        body.thread_id,
        body.message,
      );
      return {
        status: 200,
        body: { success: true, message: 'Thread Initiated' },
      };
    });
  }

  @TsRestHandler(contract.chat.getThreads)
  @UseGuards(UserJwtAuthGuard)
  async getThreads(@Req() req: Request) {
    return tsRestHandler(contract.chat.getThreads, async ({}) => {
      const res = await this.chatService.getThreads(req.user.user_uid);
      return { status: 200, body: res };
    });
  }

  @TsRestHandler(contract.chat.getMessagesInThread)
  @UseGuards(UserJwtAuthGuard)
  async getMessages(@Req() req: Request) {
    return tsRestHandler(
      contract.chat.getMessagesInThread,
      async ({ query }) => {
        const res = await this.chatService.getMessages(query.thread_id, req.user.user_uid);
        return { status: 200, body: res };
      },
    );
  }
}
