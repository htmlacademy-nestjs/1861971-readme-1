import { Module } from '@nestjs/common';
import {JwtModule} from '@nestjs/jwt';
import {ConfigService} from '@nestjs/config';

import { AuthorizationController } from './authorization.controller';
import { AuthorizationService } from './authorization.service';
import { BlogUserModule } from '../blog-user/blog-user.module';
import { getJwtOptions } from '@project/config-users';
import { JwtAccessStrategy } from './strategies/jwt-access.strategy';

@Module({
  imports: [
    BlogUserModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: getJwtOptions
    })
  ],
  controllers: [AuthorizationController],
  providers: [
    AuthorizationService,
    JwtAccessStrategy
  ],
})
export class AuthorizationModule {}
