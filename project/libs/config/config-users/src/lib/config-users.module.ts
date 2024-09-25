import { Module } from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';

import appConfig from './config/app.config';
import dbConfig from './config/db.config';
import jwtConfig from './config/jwt.config';
import rebbitConfig from './config/rabbit.config';

const ENV_USERS_FILE_PATH = 'apps/user/.user.env';
const ENV_NOTIFY_FILE_PATH = 'apps/notify/.notify.env';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [appConfig, dbConfig, jwtConfig, rebbitConfig],
      envFilePath: [ENV_USERS_FILE_PATH, ENV_NOTIFY_FILE_PATH]
    }),
  ]
})
export class ConfigUsersModule {}
