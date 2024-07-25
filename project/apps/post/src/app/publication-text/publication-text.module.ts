import { Module } from '@nestjs/common';

import { BlogTextModule } from '../blog-text/blog-text.module';
import { BlogCommentModule } from '../blog-comment/blog-comment.module';
import { PublicationTextService } from './publication-text.service';
import { PublicationTextController } from './publication-text.controller';

@Module({
  imports: [BlogTextModule, BlogCommentModule],
  providers: [PublicationTextService],
  controllers: [PublicationTextController],
})
export class PublicationTextModule {}
