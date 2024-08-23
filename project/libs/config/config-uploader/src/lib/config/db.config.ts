import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';

const DEFAULT_MONGO_PORT = '27017';

export interface DbConfig {
  user: string | undefined;
  password: string | undefined;
  host: string | undefined;
  port: string | undefined;
}

export default registerAs('db', (): DbConfig => {
  const config: DbConfig = {
    user: process.env['MONGO_USER'],
    password: process.env['MONGO_PASSWORD'],
    host: process.env['MONGO_HOST'],
    port: process.env['MONGO_PORT'] || DEFAULT_MONGO_PORT
  };

  const validationSchema = Joi.object<DbConfig>({
    user: Joi.string().required(),
    password: Joi.string().required(),
    host: Joi.string().hostname().required(),
    port: Joi.number().port().default(DEFAULT_MONGO_PORT)
  });

  const { error } = validationSchema.validate(config, { abortEarly: true });

  if (error) {
    throw new Error(
      `[Uploader DB Config]: Environments validation failed. Please check .env file.
      Error message: ${error.message}`,
    );
  }

  return config;
});
