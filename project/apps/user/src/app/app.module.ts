import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { BlogUserModule } from './blog-user/blog-user.module';
import { RegistrationModule } from './registration/registration.module';
import { AuthorizationModule } from './authorization/authorization.module';
import { ConfigUsersModule, getMongooseOptions } from '@project/config-users';
import { NotifyModule } from './notify/notify.module';

@Module({
  imports: [
    BlogUserModule,
    RegistrationModule,
    AuthorizationModule,
    ConfigUsersModule,
    MongooseModule.forRootAsync(getMongooseOptions()),
    NotifyModule,
  ],
})
export class AppModule {}
