import { Module } from '@nestjs/common';

import { RegistrationController } from './registration.controller';
import { RegistrationService } from './registration.service';
import { BlogUserModule } from '../blog-user/blog-user.module';

@Module({
  imports: [BlogUserModule],
  controllers: [RegistrationController],
  providers: [RegistrationService]
})
export class RegistrationModule {}
