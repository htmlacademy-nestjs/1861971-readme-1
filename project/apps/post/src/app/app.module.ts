import { Module } from '@nestjs/common';

import { PublicationModule } from './publication-video/publication.module';
import { BlogVideoModule } from './blog-video/blog-video.module';
import { BlogTextModule } from './blog-text/blog-text.module';
import { PublicationTextModule } from './publication-text/publication-text.module';
import { BlogQuoteModule } from './blog-quote/blog-quote.module';
import { PublicationQuoteModule } from './publication-quote/publication-quote.module';
import { BlogPhotoModule } from './blog-photo/blog-photo.module';
import { PublicationPhotoModule } from './publication-photo/publication-photo.module';
import { BlogLinkModule } from './blog-link/blog-link.module';
import { PublicationLinkModule } from './publication-link/publication-link.module';
import { PublicationsListModule } from './publications-list/publications-list.module';
import { PublicationLikeModule } from './publication-like/publication-like.module';
import { BlogCommentModule } from './blog-comment/blog-comment.module';
import { PublicationCommentModule } from './publication-comment/publication-comment.module';
import { PublicationSearchModule } from './publication-search/publication-search.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigPostModule } from '@project/config-post';

@Module({
  imports: [
    PublicationModule,
    BlogVideoModule,
    BlogTextModule,
    PublicationTextModule,
    BlogQuoteModule,
    PublicationQuoteModule,
    BlogPhotoModule,
    PublicationPhotoModule,
    BlogLinkModule,
    PublicationLinkModule,
    PublicationsListModule,
    PublicationLikeModule,
    BlogCommentModule,
    PublicationCommentModule,
    PublicationSearchModule,
    PrismaModule,
    ConfigPostModule
  ],
})
export class AppModule {}
