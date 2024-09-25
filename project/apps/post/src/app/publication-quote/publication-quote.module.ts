import { Module } from '@nestjs/common';
import {JwtModule} from '@nestjs/jwt';
import {ConfigService} from '@nestjs/config';

import { BlogQuoteModule } from '../blog-quote/blog-quote.module';
import { BlogCommentModule } from '../blog-comment/blog-comment.module';
import { PublicationQuoteService } from './publication-quote.service';
import { PublicationQuoteController } from './publication-quote.controller';
import { getJwtOptions } from '@project/config-post';
import { JwtAccessStrategy } from '../strategies/jwt-access.strategy';

@Module({
  imports: [
    BlogQuoteModule,
    BlogCommentModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: getJwtOptions
    })
  ],
  providers: [
    PublicationQuoteService,
    JwtAccessStrategy
  ],
  controllers: [PublicationQuoteController],
})
export class PublicationQuoteModule {}
