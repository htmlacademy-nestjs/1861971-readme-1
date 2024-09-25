import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ConfigNotifyModule, getMongooseOptions } from '@project/config-notify';
import { EmailSubscriberModule } from './email-subscriber/email-subscriber.module';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [
    ConfigNotifyModule,
    MongooseModule.forRootAsync(getMongooseOptions()),
    EmailSubscriberModule,
    MailModule,
  ],
})
export class AppModule {}
