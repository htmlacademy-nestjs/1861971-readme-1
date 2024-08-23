import {  Module } from '@nestjs/common';
import {ServeStaticModule} from '@nestjs/serve-static';

import {ConfigService} from '@nestjs/config';
import { FileService } from './file.service';
import { FileController } from './file.controller';
import { BlogFileModule } from '../blog-file/blog-file.module';

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
    BlogFileModule
  ],
  providers: [FileService],
  controllers: [FileController],
})
export class FileModule {}
