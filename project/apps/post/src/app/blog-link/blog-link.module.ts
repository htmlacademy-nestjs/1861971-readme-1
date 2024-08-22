import { Module } from '@nestjs/common';
import { BlogLinkRepository } from './blog-link.repository';

@Module({
  providers: [BlogLinkRepository],
  exports: [BlogLinkRepository]
})
export class BlogLinkModule {}
