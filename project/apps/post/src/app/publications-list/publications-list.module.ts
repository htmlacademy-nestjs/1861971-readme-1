import { Module } from '@nestjs/common';

import { BlogVideoModule } from '../blog-video/blog-video.module';
import { BlogTextModule } from '../blog-text/blog-text.module';
import { BlogQuoteModule } from '../blog-quote/blog-quote.module';
import { BlogPhotoModule } from '../blog-photo/blog-photo.module';
import { BlogLinkModule } from '../blog-link/blog-link.module';
import { PublicationsListService } from './publications-list.service';
import { PublicationsListController } from './publications-list.controller';

@Module({
  imports: [
    BlogVideoModule,
    BlogTextModule,
    BlogQuoteModule,
    BlogPhotoModule,
    BlogLinkModule,
  ],
  providers: [PublicationsListService],
  controllers: [PublicationsListController],
})
export class PublicationsListModule {}
