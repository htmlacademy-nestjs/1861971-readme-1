import {
  Controller,
  Post,
  Patch,
  Body,
  Param,
  HttpStatus,
  UseGuards
 } from '@nestjs/common';
 import {
  ApiTags,
  ApiCreatedResponse,
  ApiResponse,
  ApiParam,
  ApiHeader
} from '@nestjs/swagger';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

import { AuthorizationService } from './authorization.service';
import { LoginUserDto } from './dto/login-user.dto';
import { ChangPasswordUserDto } from './dto/chang-password-user.dto';
import {fillObject} from '@project/util-core'
import { UserRdo } from '../registration/rdo/user.rdo';
import {MongoIdValidationPipe} from '@project/shared-pipes';

@ApiTags('authorization')
@Controller('user')
export class AuthorizationController {
  constructor(
    private readonly authorizationService: AuthorizationService
  ) {}

  @ApiCreatedResponse({
    status: HttpStatus.OK,
    description: 'The user has passed authorization',
    type: UserRdo
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User not found'
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'User password is wrong'
  })
  @Post('authorization')
  public async create(@Body() dto: LoginUserDto) {
    const accessToken = await this.authorizationService.verify(dto);
    return accessToken
  }

  @ApiHeader({
    name: 'Authorization',
    required: true,
    description: 'accessToken',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2Y2Q3MGZlMDhlNDAwNWY4NmQxNDczNiIsImVtYWlsIjoidmx3MDQsImV4cCI6MTcyNTYwODkwNH0.ReWjyAgo2dsO1Kpbqrn0tfpaFK89YLXM3J39pGXpG4E'
  })
  @ApiCreatedResponse({
    status: HttpStatus.OK,
    description: 'The user has successfully changed his password',
    type: UserRdo
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User not found'
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'User password is wrong'
  })
  @ApiParam({
    name: 'id',
    description: 'Unique user id',
    example: '66aa47a11ee332582a197c8f'
  })
  @UseGuards(JwtAuthGuard)
  @Patch('authorization/:id')
  public async update(@Body() dto: ChangPasswordUserDto, @Param('id', MongoIdValidationPipe) id: string) {
    const user = await this.authorizationService.update(id, dto);
    return fillObject(UserRdo, user);
  }
}
