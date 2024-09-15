import { Module } from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';

import appConfig from './config/app.config';
import dbConfig from './config/db.config';
import rebbitConfig from './config/rabbit.config';
import mailConfig from './config/mail.config';

const ENV_NOTIFY_FILE_PATH = 'apps/notify/.notify.env';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [appConfig, dbConfig, rebbitConfig, mailConfig],
      envFilePath: ENV_NOTIFY_FILE_PATH
    }),
  ]
})
export class ConfigNotifyModule {}
