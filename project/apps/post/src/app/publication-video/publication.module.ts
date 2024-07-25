import { Module } from '@nestjs/common';

import { BlogVideoModule } from '../blog-video/blog-video.module';
import { BlogCommentModule } from '../blog-comment/blog-comment.module';
import { PublicationController } from './publication.controller';
import { PublicationService } from './publication.service';

@Module({
  imports: [BlogVideoModule, BlogCommentModule],
  controllers: [PublicationController],
  providers: [PublicationService],
})
export class PublicationModule {}
