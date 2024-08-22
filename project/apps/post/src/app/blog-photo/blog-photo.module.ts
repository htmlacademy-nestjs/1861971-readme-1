import { Module } from '@nestjs/common';
import { BlogPhotoRepository } from './blog-photo.repository';

@Module({
  providers: [BlogPhotoRepository],
  exports: [BlogPhotoRepository]
})
export class BlogPhotoModule {}
