import { Module } from '@nestjs/common';

import { BlogQuoteModule } from '../blog-quote/blog-quote.module';
import { BlogCommentModule } from '../blog-comment/blog-comment.module';
import { PublicationQuoteService } from './publication-quote.service';
import { PublicationQuoteController } from './publication-quote.controller';

@Module({
  imports: [BlogQuoteModule, BlogCommentModule],
  providers: [PublicationQuoteService],
  controllers: [PublicationQuoteController],
})
export class PublicationQuoteModule {}
