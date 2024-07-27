import { Module } from '@nestjs/common';
import { BlogPhotoMemoryRepository } from './blog-photo-memory-repository';

@Module({
  providers: [BlogPhotoMemoryRepository],
  exports: [BlogPhotoMemoryRepository]
})
export class BlogPhotoModule {}
