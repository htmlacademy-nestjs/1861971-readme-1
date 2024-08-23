import {
  Controller,
  Get,
  Inject,
  Param,
  Post,
  UploadedFile,
  UseInterceptors
} from '@nestjs/common';
import 'multer';
import { Express } from 'express';

import { FileInterceptor } from '@nestjs/platform-express';
import { FileService } from './file.service';
import { fillObject } from '@project/util-core';
import { UploadedFileRdo } from './rdo/uploaded-file.rdo';
import { appConfig } from '@project/config-uploader';
import { ConfigType } from '@nestjs/config';

@Controller('files')
export class FileController {

  constructor(
    private readonly fileService: FileService,

    @Inject(appConfig.KEY)
    private readonly applicationConfig: ConfigType<typeof appConfig>,
  ) {}

  @Post('/upload')
  @UseInterceptors(FileInterceptor('file'))
  public async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const newFile = await this.fileService.saveFile(file);
    const path = `${this.applicationConfig.serveRoot}${newFile.path}`;
    return fillObject(UploadedFileRdo, Object.assign(newFile, { path }));
  }

  @Get(':fileId')
  public async show(@Param('fileId') fileId: string) {
    const existFile = await this.fileService.getFile(fileId);
    const path = `${this.applicationConfig.serveRoot}${existFile.path}`;
    return fillObject(UploadedFileRdo, Object.assign(existFile, { path }));
  }
}

