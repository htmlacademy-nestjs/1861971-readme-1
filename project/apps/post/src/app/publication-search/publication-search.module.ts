import { Module } from '@nestjs/common';

import { PublicationSearchService } from './publication-search.service';
import { PublicationSearchController } from './publication-search.controller';
import { BlogLinkModule } from '../blog-link/blog-link.module';
import { BlogPhotoModule } from '../blog-photo/blog-photo.module';
import { BlogQuoteModule } from '../blog-quote/blog-quote.module';
import { BlogTextModule } from '../blog-text/blog-text.module';
import { BlogVideoModule } from '../blog-video/blog-video.module';

@Module({
  imports: [
    BlogLinkModule,
    BlogPhotoModule,
    BlogQuoteModule,
    BlogTextModule,
    BlogVideoModule
  ],
  providers: [PublicationSearchService],
  controllers: [PublicationSearchController],
})
export class PublicationSearchModule {}
