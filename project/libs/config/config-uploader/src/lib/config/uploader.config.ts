import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';

const DEFAULT_PORT = 3000;

export interface UploaderConfig {
  environment: string | undefined ;
  uploadDirectory: string | undefined;
  serveRoot: string | undefined;
  prefix: string | undefined;
  port: number | undefined;
}

export default registerAs('application', (): UploaderConfig => {
  const config: UploaderConfig = {
    environment: process.env['NODE_ENV'],
    uploadDirectory: process.env['UPLOAD_DIRECTORY'],
    serveRoot: process.env['SERVE_ROOT'],
    prefix: process.env['PREFIX'],
    port: parseInt(process.env['PORT'] || DEFAULT_PORT.toString(), 10),
  };

  const validationSchema = Joi.object<UploaderConfig>({
    environment: Joi.string().valid('development', 'production', 'stage'),
    uploadDirectory: Joi.string(),
    serveRoot: Joi.string().required(),
    prefix: Joi.string().valid('api').required(),
    port: Joi.number().port().default(DEFAULT_PORT),

  });

  const { error } = validationSchema.validate(config, { abortEarly: true });

  if (error) {
    throw new Error(
      `[Uploader Config]: Environments validation failed. Please check .env file.
       Error message: ${error.message}`,
    );
  }

  return config;
});
