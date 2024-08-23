import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  HttpStatus
} from '@nestjs/common';
import {
  ApiTags,
  ApiCreatedResponse,
  ApiResponse,
  ApiParam
} from '@nestjs/swagger';

import { RegistrationService } from './registration.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRdo } from './rdo/user.rdo';
import {DetailsUserRdo} from './rdo/details-user.rdo'
import {fillObject} from '@project/util-core';

@ApiTags('registration')
@Controller('user')
export class RegistrationController {
  constructor(
    private readonly registrationService: RegistrationService
  ) {}

  @ApiCreatedResponse({
    status: HttpStatus.CREATED,
    description: 'User registration',
    type: UserRdo
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'User with this email exists'
  })
  @Post('register')
  public async create(@Body() dto: CreateUserDto) {
    const newUser = await this.registrationService.register(dto);
    return fillObject(UserRdo, newUser);
  }

  @ApiCreatedResponse({
    status: HttpStatus.OK,
    description: 'Getting user data',
    type: DetailsUserRdo
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User not found'
  })
  @ApiParam({
    name: 'id',
    description: 'Unique user id',
    example: '66aa47a11ee332582a197c8f'
  })
  @Get('register/:id')
  public async show(@Param('id') id: string) {
    const existUser = await this.registrationService.getUser(id);
    return fillObject(DetailsUserRdo, existUser);
  }
}
