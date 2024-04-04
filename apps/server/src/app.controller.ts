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
    Logger.log(`Docs at: ${clc.yellow('http://localhost:3000/docs')}`);
    Logger.log(
      `Admin panel at: ${clc.yellow('http://localhost:5173/')} [dev only]`,
    );
    Logger.log(`DB Explorer at: ${clc.yellow('https://local.drizzle.studio')}`);
    Logger.log(`Client at ${clc.yellow('http://localhost:3001')}`);
  }
}
