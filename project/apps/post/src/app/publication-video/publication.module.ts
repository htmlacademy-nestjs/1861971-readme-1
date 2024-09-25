import { Module } from '@nestjs/common';
import {JwtModule} from '@nestjs/jwt';
import {ConfigService} from '@nestjs/config';

import { BlogVideoModule } from '../blog-video/blog-video.module';
import { BlogCommentModule } from '../blog-comment/blog-comment.module';
import { PublicationController } from './publication.controller';
import { PublicationService } from './publication.service';
import { getJwtOptions } from '@project/config-post';
import { JwtAccessStrategy } from '../strategies/jwt-access.strategy';

@Module({
  imports: [
    BlogVideoModule,
    BlogCommentModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: getJwtOptions
    })
  ],
  controllers: [PublicationController],
  providers: [
    PublicationService,
    JwtAccessStrategy
  ],
})
export class PublicationModule {}
