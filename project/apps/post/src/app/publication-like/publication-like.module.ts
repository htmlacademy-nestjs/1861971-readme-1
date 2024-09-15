import { Module } from '@nestjs/common';
import {JwtModule} from '@nestjs/jwt';
import {ConfigService} from '@nestjs/config';

import { PublicationLikeController } from './publication-like.controller';
import { PublicationLikeService } from './publication-like.service';
import { BlogLinkModule } from '../blog-link/blog-link.module';
import { BlogPhotoModule } from '../blog-photo/blog-photo.module';
import { BlogQuoteModule } from '../blog-quote/blog-quote.module';
import { BlogTextModule } from '../blog-text/blog-text.module';
import { BlogVideoModule } from '../blog-video/blog-video.module';
import { getJwtOptions } from '@project/config-post';
import { JwtAccessStrategy } from '../strategies/jwt-access.strategy';

@Module({
  imports: [
    BlogVideoModule,
    BlogTextModule,
    BlogQuoteModule,
    BlogPhotoModule,
    BlogLinkModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: getJwtOptions
    })
  ],
  controllers: [PublicationLikeController],
  providers: [
    PublicationLikeService,
    JwtAccessStrategy
  ],
})
export class PublicationLikeModule {}
