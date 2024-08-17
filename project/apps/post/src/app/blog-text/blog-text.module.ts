import { Module } from '@nestjs/common';

import { BlogTextRepository } from './blog-text.repository';

@Module({
  providers: [BlogTextRepository],
  exports: [BlogTextRepository]
})
export class BlogTextModule {}
