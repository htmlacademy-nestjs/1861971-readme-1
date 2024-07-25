import { Module } from '@nestjs/common';

import { BlogVideoMemoryRepository } from './blog-video-memory-repository';

@Module({
  providers: [BlogVideoMemoryRepository],
  exports: [BlogVideoMemoryRepository]
})
export class BlogVideoModule {}
