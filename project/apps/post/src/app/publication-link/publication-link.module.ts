import { Module } from '@nestjs/common';
import {JwtModule} from '@nestjs/jwt';
import {ConfigService} from '@nestjs/config';

import { PublicationLinkService } from './publication-link.service';
import { BlogLinkModule } from '../blog-link/blog-link.module';
import { BlogCommentModule } from '../blog-comment/blog-comment.module';
import { PublicationLinkController } from './publication-link.controller';
import { getJwtOptions } from '@project/config-post';
import { JwtAccessStrategy } from '../strategies/jwt-access.strategy';

@Module({
  imports: [
    BlogLinkModule,
    BlogCommentModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: getJwtOptions
    })
  ],
  providers: [
    PublicationLinkService,
    JwtAccessStrategy
  ],
  controllers: [PublicationLinkController],
})
export class PublicationLinkModule {}
