import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { BlogFileRepository } from './blog-file.repository';
import { BlogFileModel, BlogFileSchema } from './blog-file.model';

@Module({
  imports: [MongooseModule.forFeature([
    { name: BlogFileModel.name, schema: BlogFileSchema }
  ])
],
  providers: [BlogFileRepository],
  exports: [BlogFileRepository]
})
export class BlogFileModule {}
