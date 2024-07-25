import {
  Controller,
  Post,
  Body,
  Get,
  Param
} from '@nestjs/common';

import { RegistrationService } from './registration.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRdo } from './rdo/user.rdo';
import {DetailsUserRdo} from './rdo/details-user.rdo'
import {fillObject} from '@project/util-core';

@Controller('user')
export class RegistrationController {
  constructor(
    private readonly registrationService: RegistrationService
  ) {}

  @Post('register')
  public async create(@Body() dto: CreateUserDto) {
    const newUser = await this.registrationService.register(dto);
    return fillObject(UserRdo, newUser);
  }

  @Get(':id')
  public async show(@Param('id') id: string) {
    const existUser = await this.registrationService.getUser(id);
    return fillObject(DetailsUserRdo, existUser);
  }
}
