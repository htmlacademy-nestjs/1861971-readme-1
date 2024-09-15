import { Module } from '@nestjs/common';
import {JwtModule} from '@nestjs/jwt';
import {ConfigService} from '@nestjs/config';

import { BlogTextModule } from '../blog-text/blog-text.module';
import { BlogCommentModule } from '../blog-comment/blog-comment.module';
import { PublicationTextService } from './publication-text.service';
import { PublicationTextController } from './publication-text.controller';
import { getJwtOptions } from '@project/config-post';
import { JwtAccessStrategy } from '../strategies/jwt-access.strategy';

@Module({
  imports: [
    BlogTextModule,
    BlogCommentModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: getJwtOptions
    })
  ],
  providers: [
    PublicationTextService,
    JwtAccessStrategy
  ],
  controllers: [PublicationTextController],
})
export class PublicationTextModule {}
