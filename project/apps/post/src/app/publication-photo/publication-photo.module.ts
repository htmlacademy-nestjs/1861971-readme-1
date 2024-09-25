import { Module } from '@nestjs/common';
import {JwtModule} from '@nestjs/jwt';
import {ConfigService} from '@nestjs/config';

import { BlogPhotoModule } from '../blog-photo/blog-photo.module';
import { BlogCommentModule } from '../blog-comment/blog-comment.module';
import { PublicationPhotoService } from './publication-photo.service';
import { PublicationPhotoController } from './publication-photo.controller';
import { getJwtOptions } from '@project/config-post';
import { JwtAccessStrategy } from '../strategies/jwt-access.strategy';

@Module({
  imports: [
    BlogPhotoModule,
    BlogCommentModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: getJwtOptions
    })
  ],
  providers: [
    PublicationPhotoService,
    JwtAccessStrategy
  ],
  controllers: [PublicationPhotoController],
})
export class PublicationPhotoModule {}
