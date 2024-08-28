import { getMongoURI } from '@project/util-core'
import { MongooseModuleAsyncOptions } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';

export function getMongooseOptions(): MongooseModuleAsyncOptions {
  return {
    useFactory: async (config: ConfigService) => {
      return {
        uri: getMongoURI(
          config.get<string>('db.user') as string,
          config.get<string>('db.password') as string,
          config.get<string>('db.host') as string,
          config.get<string>('db.port') as string,
        )
      }
    },
    inject: [ConfigService]
  }
}
