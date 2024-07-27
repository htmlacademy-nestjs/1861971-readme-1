import { Module } from '@nestjs/common';

import { BlogPhotoModule } from '../blog-photo/blog-photo.module';
import { BlogCommentModule } from '../blog-comment/blog-comment.module';
import { PublicationPhotoService } from './publication-photo.service';
import { PublicationPhotoController } from './publication-photo.controller';

@Module({
  imports: [BlogPhotoModule, BlogCommentModule],
  providers: [PublicationPhotoService],
  controllers: [PublicationPhotoController],
})
export class PublicationPhotoModule {}
