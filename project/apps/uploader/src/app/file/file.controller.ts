import {
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Body,
  UploadedFile,
  UseInterceptors
} from '@nestjs/common';
import 'multer';
import { Express } from 'express';
import {
  ApiTags,
  ApiCreatedResponse,
  ApiParam,
  ApiFoundResponse,
  ApiNotFoundResponse
} from '@nestjs/swagger';
import { Buffer } from 'node:buffer';

import { FileInterceptor } from '@nestjs/platform-express';
import { FileService } from './file.service';
import { fillObject } from '@project/util-core';
import { UploadedFileRdo } from './rdo/uploaded-file.rdo';
import { appConfig } from '@project/config-uploader';
import { ConfigType } from '@nestjs/config';
import {MongoIdValidationPipe} from '@project/shared-pipes';
import { FileTypeValidatorPipe } from '@project/shared-pipes';


@ApiTags('file')
@Controller('files')
export class FileController {

  constructor(
    private readonly fileService: FileService,

    @Inject(appConfig.KEY)
    private readonly applicationConfig: ConfigType<typeof appConfig>,
  ) {}

  @ApiCreatedResponse({
    description: 'Avatar created',
    type: UploadedFileRdo
  })
  @Post('/avatar')
  @UseInterceptors(FileInterceptor('avatar'))
  public async uploadAvatar(
    @UploadedFile(new FileTypeValidatorPipe()) file: Express.Multer.File,
    @Body(new FileTypeValidatorPipe()) body
  ) {
    const payload = file ? file : body
    //const {size, buffer} = payload

    //const buf = Buffer.alloc(Number(size), buffer);
    //const newPayload = {...payload, buffer: buf}

    const newFile = await this.fileService.saveFile(payload);
    const path = `${this.applicationConfig.serveRoot}${newFile.path}`;
    return fillObject(UploadedFileRdo, Object.assign(newFile, { path }));
  }


  @ApiCreatedResponse({
    description: 'Avatar created',
    type: UploadedFileRdo
  })
  @Post('/photo')
  @UseInterceptors(FileInterceptor('photo'))
  public async uploadPhoto(@UploadedFile(
    new FileTypeValidatorPipe()) file: Express.Multer.File,
    @Body(new FileTypeValidatorPipe()) body
  ) {
    const payload = file ? file : body

    const newFile = await this.fileService.saveFile(payload);
    const path = `${this.applicationConfig.serveRoot}${newFile.path}`;
    return fillObject(UploadedFileRdo, Object.assign(newFile, { path }));
  }


  @ApiFoundResponse({
    description: 'Found a image',
    type: UploadedFileRdo
  })
  @ApiNotFoundResponse({
    description: 'Image not found',
    example: 'File with id: 4 not found.'
  })
  @ApiParam({
    name: 'fileId',
    description: 'Unique image id',
    example: 'http://localhost:4000/api/files/66c89de5e529bf2940cd50f7'
  })
  @Get(':fileId')
  public async show(@Param('fileId', MongoIdValidationPipe) fileId: string) {
    const existFile = await this.fileService.getFile(fileId);
    const path = `${this.applicationConfig.serveRoot}${existFile.path}`;
    return fillObject(UploadedFileRdo, Object.assign(existFile, { path }));
  }
}

