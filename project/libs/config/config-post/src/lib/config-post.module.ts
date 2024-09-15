import { Module } from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';

import appConfig from './config/app.config';
import jwtConfig from './config/jwt.config';

const ENV_POST_FILE_PATH = 'apps/post/.post.env';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [appConfig, jwtConfig],
      envFilePath: ENV_POST_FILE_PATH
    }),
  ]
})
export class ConfigPostModule {}
