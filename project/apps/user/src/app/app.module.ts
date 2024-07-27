import { Module } from '@nestjs/common';

import { BlogUserModule } from './blog-user/blog-user.module';
import { RegistrationModule } from './registration/registration.module';
import { AuthorizationModule } from './authorization/authorization.module';

@Module({
  imports: [BlogUserModule, RegistrationModule, AuthorizationModule]
})
export class AppModule {}
