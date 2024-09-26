import { Module } from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';

import appConfig from './config/app.config';

const ENV_BFF_FILE_PATH = 'apps/bff/.bff.env';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [appConfig],
      envFilePath: [ENV_BFF_FILE_PATH]
    }),
  ]
})
export class ConfigBffModule {}
