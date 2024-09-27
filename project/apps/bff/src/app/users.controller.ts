import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  Patch,
  UseFilters,
  UseInterceptors,
  Req,
  UploadedFile
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import {Request, Express} from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import 'multer';

import { ApplicationServiceURL } from '@project/shared-types';
import { AxiosExceptionFilter } from '@project/exception-filter';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { ChangPasswordUserDto } from './dto/chang-password-user.dto';
import { UploadedFileRdo } from './rdo/uploaded-file.rdo';
import { UserRdo } from './rdo/user.rdo';
import { DataUserRdo } from './rdo/data-user.rdo';
import { DetailsUserRdo } from './rdo/details-user.rdo';
import {MongoIdValidationPipe} from '@project/shared-pipes';

type AccessToken = {
  accessToken: string;
}


@Controller('user')
@UseFilters(AxiosExceptionFilter)
export class UserController {
  constructor(
    private readonly httpService: HttpService
  ) {}

  @Post('avatar')
  @UseInterceptors(FileInterceptor('avatar'))
  public async uploadAvatar(@UploadedFile() file: Express.Multer.File): Promise<UploadedFileRdo> {

    const {data} = await this.httpService.axiosRef
    .post<UploadedFileRdo>(`${ApplicationServiceURL.Uploader}${ApplicationServiceURL.Avatar}`,
      {...file, buffer: file.buffer.toString('hex')},
      {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
    );

    return data
  }

  @Post('register')
  public async create(@Body() dto: CreateUserDto): Promise<UserRdo> {
    const {data} = await this.httpService.axiosRef
    .post<UserRdo>(`${ApplicationServiceURL.User}${ApplicationServiceURL.Register}`, dto);

    return data;
  }

  @Get('register/:id')
  public async show(@Param('id', MongoIdValidationPipe) id: string): Promise<DetailsUserRdo> {

    const {data} = await this.httpService.axiosRef
    .get<DataUserRdo>(`${ApplicationServiceURL.User}${ApplicationServiceURL.Register}/${id}`);

    const detailsUser = {
      ...data,
      numberPublication: 7,
      numberSubscriber: 7,
    }

    return detailsUser;
  }

  @Post('authorization')
  public async getToken(@Body() dto: LoginUserDto): Promise<AccessToken> {
    const {data} =  await this.httpService.axiosRef
    .post<AccessToken>(`${ApplicationServiceURL.User}${ApplicationServiceURL.Authorization}`, dto);

    return data
  }

  @Patch('authorization/:id')
  public async update(@Req() {headers}: Request, @Body() dto: ChangPasswordUserDto, @Param('id', MongoIdValidationPipe) id: string): Promise<UserRdo> {
    const {authorization} = headers

    const {data} =  await this.httpService.axiosRef
    .patch<UserRdo>(`${ApplicationServiceURL.User}${ApplicationServiceURL.Authorization}/${id}`, dto, {headers: {'authorization': authorization}});

    const {avatar} = data as unknown as UserRdo

    const userAvatar = await this.httpService.axiosRef
    .get<UploadedFileRdo>(`${ApplicationServiceURL.Uploader}/${avatar}`);

    const user = {
      ...data,
      avatar: userAvatar.data
    }

    return user as unknown as UserRdo
  }
}
