import {  Module } from '@nestjs/common';
import {ServeStaticModule} from '@nestjs/serve-static';
import {MongooseModule} from '@nestjs/mongoose';

import {ConfigService} from '@nestjs/config';
import { FileService } from './file.service';
import { FileController } from './file.controller';
import { FileModel, FileSchema } from './file.model';
import { FileRepository } from './file.repository';

@Module({
  imports: [
    ServeStaticModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const uploadDirectory = configService.get<string>('application.uploadDirectory');
        const serveRoot = configService.get<string>('application.serveRoot');
        return [{
          uploadDirectory,
          serveRoot,
          serveStaticOptions: {
            fallthrough: true,
            etag: true,
          }
        }]
      }
    }),
    MongooseModule.forFeature([
      { name: FileModel.name, schema: FileSchema }
    ])
  ],
  providers: [FileService, FileRepository],
  controllers: [FileController],
})
export class FileModule {}
