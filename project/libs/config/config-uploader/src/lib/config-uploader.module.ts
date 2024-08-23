import { Module } from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import appConfig from './config/uploader.config';

const ENV_FILE_PATH = 'apps/uploader/.uploader.env';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [appConfig],
      envFilePath: ENV_FILE_PATH
    }),
  ]
})
export class ConfigUploaderModule {}
