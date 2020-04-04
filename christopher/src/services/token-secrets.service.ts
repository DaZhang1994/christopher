import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
const Config = require(`../../config/${process.env.NODE_ENV}`);
import * as RandomString from 'randomstring';

@Injectable()
export class TasksService {

  private readonly logger = new Logger(TasksService.name);

  @Cron(CronExpression.EVERY_5_MINUTES)
  handleCron() {
    Config.token.secrets = RandomString.generate(128);
    this.logger.debug(`Generated new token secrets -- ${Config.token.secrets}`);
  }
}
