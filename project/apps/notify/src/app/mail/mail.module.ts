import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import {MailerModule} from '@nestjs-modules/mailer';

import { getMailerAsyncOptions } from '@project/util-core';

@Module({
  imports: [
    MailerModule.forRootAsync(
      getMailerAsyncOptions()
    )
  ],
  providers: [MailService],
  exports: [MailService]
})
export class MailModule {}
