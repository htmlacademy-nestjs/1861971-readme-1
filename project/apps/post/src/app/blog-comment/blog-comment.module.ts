import { Module } from '@nestjs/common';

import { BlogCommentRepository } from './blog-comment.repository';

@Module({
  providers: [BlogCommentRepository],
  exports: [BlogCommentRepository]
})
export class BlogCommentModule {}
