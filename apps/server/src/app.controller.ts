import {
  Controller,
  Get,
  Logger,
  OnApplicationBootstrap,
} from '@nestjs/common';
import { AppService } from './app.service';
import * as clc from 'cli-color';
@Controller()
export class AppController implements OnApplicationBootstrap {
  constructor(private readonly appService: AppService) {}
  onApplicationBootstrap() {
    Logger.log(`Docs at: ${"http://localhost:3000/docs"}`);
    Logger.log(
      `Admin panel at: ${"http://localhost:5173/"} [dev only]`,
    );
    Logger.log(`DB Explorer at: ${"https://local.drizzle.studio"}`);
    Logger.log(`Client at ${"http://localhost:3001"}`);
  }
}
