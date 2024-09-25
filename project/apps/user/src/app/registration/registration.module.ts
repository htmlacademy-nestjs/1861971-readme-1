import { Module } from '@nestjs/common';

import { RegistrationController } from './registration.controller';
import { RegistrationService } from './registration.service';
import { BlogUserModule } from '../blog-user/blog-user.module';
import { NotifyModule } from '../notify/notify.module';

@Module({
  imports: [
    BlogUserModule,
    NotifyModule
  ],
  controllers: [RegistrationController],
  providers: [RegistrationService]
})
export class RegistrationModule {}
