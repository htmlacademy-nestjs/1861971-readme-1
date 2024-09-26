import { Module } from '@nestjs/common';
import {HttpModule} from '@nestjs/axios';

import {ConfigurationAxios} from '@project/shared-types';
import { UserController } from './users.controller';
import { VideoController } from './video.controller';
import {ConfigBffModule} from '@project/config-bff';

@Module({
  imports: [
    HttpModule.register({
      timeout:ConfigurationAxios.Timeout,
      maxRedirects:ConfigurationAxios.MaxRedirects
    }),
    ConfigBffModule
  ],
  controllers: [
    UserController,
    VideoController
  ],
  providers: [],
})
export class AppModule {}
