import { Module } from '@nestjs/common';
import { BlogQuoteRepository } from './blog-quote.repository';

@Module({
  providers: [BlogQuoteRepository],
  exports: [BlogQuoteRepository]
})
export class BlogQuoteModule {}
