import { Module } from '@nestjs/common';

import { BlogVideoRepository } from './blog-video.repository';

@Module({
  providers: [BlogVideoRepository],
  exports: [BlogVideoRepository]
})
export class BlogVideoModule {}
