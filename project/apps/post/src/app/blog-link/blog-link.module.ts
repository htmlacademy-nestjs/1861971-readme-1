import { Module } from '@nestjs/common';
import { BlogLinkMemoryRepository } from './blog-link-memory-repository';

@Module({
  providers: [BlogLinkMemoryRepository],
  exports: [BlogLinkMemoryRepository]
})
export class BlogLinkModule {}
