import {
  Controller,
  Post,
  Patch,
  Body,
  Param
 } from '@nestjs/common';

import { AuthorizationService } from './authorization.service';
import { LoginUserDto } from './dto/login-user.dto';
import { ChangPasswordUserDto } from './dto/chang-password-user.dto';
import {fillObject} from '@project/util-core'
import { UserRdo } from '../registration/rdo/user.rdo';

@Controller('user')
export class AuthorizationController {
  constructor(
    private readonly authorizationService: AuthorizationService
  ) {}

  @Post('authorization')
  public async create(@Body() dto: LoginUserDto) {
    const user = await this.authorizationService.verify(dto);
    return fillObject(UserRdo, user);
  }

  @Patch('authorization/:id')
  public async update(@Body() dto: ChangPasswordUserDto, @Param('id') id: string) {
    const user = await this.authorizationService.update(id, dto);
    return fillObject(UserRdo, user);
  }
}
