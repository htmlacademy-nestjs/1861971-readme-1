import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import {
  ConfigUploaderModule,
  getMongooseOptions,
} from '@project/config-uploader';
import { FileModule } from './file/file.module';

@Module({
  imports: [
    ConfigUploaderModule,
    FileModule,
    MongooseModule.forRootAsync(
      getMongooseOptions()
    )]
})
export class AppModule {}
