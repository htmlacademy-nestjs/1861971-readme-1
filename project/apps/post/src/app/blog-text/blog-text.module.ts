import { Module } from '@nestjs/common';

import { BlogTextMemoryRepository } from './blog-text-memory-repository';

@Module({
  providers: [BlogTextMemoryRepository],
  exports: [BlogTextMemoryRepository]
})
export class BlogTextModule {}
