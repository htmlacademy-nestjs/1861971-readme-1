import { Module } from '@nestjs/common';
import { BlogQuoteMemoryRepository } from './blog-quote-memory-repository';

@Module({
  providers: [BlogQuoteMemoryRepository],
  exports: [BlogQuoteMemoryRepository]
})
export class BlogQuoteModule {}
