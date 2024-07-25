import { Module } from '@nestjs/common';

import { BlogCommentMemoryRepository } from './blog-comment-memory-repository';

@Module({
  providers: [BlogCommentMemoryRepository],
  exports: [BlogCommentMemoryRepository]
})
export class BlogCommentModule {}
