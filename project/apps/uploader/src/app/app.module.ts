import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import {
  ConfigUploaderModule,
  getMongooseOptions,
} from '@project/config-uploader';
import { FileModule } from './file/file.module';
import { BlogFileModule } from './blog-file/blog-file.module';

@Module({
  imports: [
    ConfigUploaderModule,
    FileModule,
    BlogFileModule,
    MongooseModule.forRootAsync(
      getMongooseOptions()
    )]
})
export class AppModule {}
