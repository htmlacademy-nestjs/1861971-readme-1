import { Module } from '@nestjs/common';
import { PublicationLikeController } from './publication-like.controller';
import { PublicationLikeService } from './publication-like.service';

import { BlogLinkModule } from '../blog-link/blog-link.module';
import { BlogPhotoModule } from '../blog-photo/blog-photo.module';
import { BlogQuoteModule } from '../blog-quote/blog-quote.module';
import { BlogTextModule } from '../blog-text/blog-text.module';
import { BlogVideoModule } from '../blog-video/blog-video.module';

@Module({
  imports: [
    BlogVideoModule,
    BlogTextModule,
    BlogQuoteModule,
    BlogPhotoModule,
    BlogLinkModule,
  ],
  controllers: [PublicationLikeController],
  providers: [PublicationLikeService],
})
export class PublicationLikeModule {}
