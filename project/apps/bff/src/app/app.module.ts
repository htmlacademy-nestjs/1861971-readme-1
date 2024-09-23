import { Module } from '@nestjs/common';
import {HttpModule} from '@nestjs/axios';

import {ConfigurationAxios} from '@project/shared-types';
import { UserController } from './users.controller';
import { VideoController } from './video.controller';

@Module({
  imports: [
    HttpModule.register({
      timeout:ConfigurationAxios.Timeout,
      maxRedirects:ConfigurationAxios.MaxRedirects
    })
  ],
  controllers: [
    UserController,
    VideoController
  ],
  providers: [],
})
export class AppModule {}
