import { Module } from '@nestjs/common';
import {JwtModule} from '@nestjs/jwt';
import {ConfigService} from '@nestjs/config';

import { PublicationCommentService } from './publication-comment.service';
import { PublicationCommentController } from './publication-comment.controller';
import { BlogCommentModule } from '../blog-comment/blog-comment.module';
import { BlogLinkModule } from '../blog-link/blog-link.module';
import { BlogPhotoModule } from '../blog-photo/blog-photo.module';
import { BlogQuoteModule } from '../blog-quote/blog-quote.module';
import { BlogTextModule } from '../blog-text/blog-text.module';
import { BlogVideoModule } from '../blog-video/blog-video.module';
import { getJwtOptions } from '@project/config-post';
import { JwtAccessStrategy } from '../strategies/jwt-access.strategy';

@Module({
  imports: [
    BlogCommentModule,
    BlogLinkModule,
    BlogPhotoModule,
    BlogQuoteModule,
    BlogTextModule,
    BlogVideoModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: getJwtOptions
    })
  ],
  providers: [
    PublicationCommentService,
    JwtAccessStrategy
  ],
  controllers: [PublicationCommentController],
})
export class PublicationCommentModule {}
