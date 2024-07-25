import { Module } from '@nestjs/common';

import { PublicationLinkService } from './publication-link.service';
import { BlogLinkModule } from '../blog-link/blog-link.module';
import { BlogCommentModule } from '../blog-comment/blog-comment.module';
import { PublicationLinkController } from './publication-link.controller';

@Module({
  imports: [BlogLinkModule, BlogCommentModule],
  providers: [PublicationLinkService],
  controllers: [PublicationLinkController],
})
export class PublicationLinkModule {}
