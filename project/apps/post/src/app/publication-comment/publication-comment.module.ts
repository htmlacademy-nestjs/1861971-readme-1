import { Module } from '@nestjs/common';

import { PublicationCommentService } from './publication-comment.service';
import { PublicationCommentController } from './publication-comment.controller';
import { BlogCommentModule } from '../blog-comment/blog-comment.module';
import { BlogLinkModule } from '../blog-link/blog-link.module';
import { BlogPhotoModule } from '../blog-photo/blog-photo.module';
import { BlogQuoteModule } from '../blog-quote/blog-quote.module';
import { BlogTextModule } from '../blog-text/blog-text.module';
import { BlogVideoModule } from '../blog-video/blog-video.module';

@Module({
  imports: [
    BlogCommentModule,
    BlogLinkModule,
    BlogPhotoModule,
    BlogQuoteModule,
    BlogTextModule,
    BlogVideoModule
  ],
  providers: [PublicationCommentService],
  controllers: [PublicationCommentController],
})
export class PublicationCommentModule {}
