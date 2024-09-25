import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { ensureDir } from 'fs-extra';
import { writeFile } from 'node:fs/promises';
import * as crypto from 'node:crypto';
import dayjs from 'dayjs';

import { appConfig } from '@project/config-uploader';
import { FileRepository } from './file.repository';
import { FileEntity } from './file-entity';

type WritedFile = {
  hashName: string;
  subDirectory: string;
  path: string;
}

@Injectable()
export class FileService {
  constructor(
    @Inject(appConfig.KEY)
    private readonly applicationConfig: ConfigType<typeof appConfig>,
    private readonly fileRepository: FileRepository,
  ) {}
  private async writeFile(file: Express.Multer.File): Promise<WritedFile> {
    const [ year, month ] = dayjs().format('YYYY MM').split(' ');
    const { uploadDirectory } = this.applicationConfig;
    const subDirectory = `${year}/${month}`;

    const uuid = crypto.randomUUID();
    const fileExtension = file.originalname.split('.');
    const hashName = `${uuid}.${fileExtension[fileExtension.length -1]}`;

    const uploadDirectoryPath = `${uploadDirectory}/${subDirectory}`;
    const destinationPath = `${uploadDirectoryPath}/${hashName}`;

    await ensureDir(uploadDirectoryPath);
    await writeFile(destinationPath, file.buffer);

    return {
      hashName,
      subDirectory,
      path: `/${subDirectory}/${hashName}`,
    };
  }

  public async saveFile(file: Express.Multer.File) {
    const writedFile = await this.writeFile(file);

    const newFile = new FileEntity({
      size: file.size,
      hashName: writedFile.hashName,
      mimetype: file.mimetype,
      originalName: file.originalname,
      path: writedFile.path,
    });

    return this.fileRepository.create(newFile);
  }

  public async getFile(fileId: string) {
    const existFile = await this.fileRepository.findById(fileId);

    if (!existFile) {
      throw new NotFoundException(`File with ${fileId} not found.`);
    }

    return existFile;
  }
}

