import { Module } from '@nestjs/common';

import { AuthorizationController } from './authorization.controller';
import { AuthorizationService } from './authorization.service';
import { BlogUserModule } from '../blog-user/blog-user.module';

@Module({
  imports: [BlogUserModule],
  controllers: [AuthorizationController],
  providers: [AuthorizationService],
})
export class AuthorizationModule {}
