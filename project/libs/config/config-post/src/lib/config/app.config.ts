import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';

const DEFAULT_PORT = 3000;

export interface PostConfig {
  environment: string | undefined;
  prefix: string | undefined;
  port: number;
}

export default registerAs('application', (): PostConfig => {
  const config: PostConfig = {
    environment: process.env['NODE_ENV'],
    prefix: process.env['PREFIX'],
    port: Number(process.env['PORT']) || DEFAULT_PORT,
  };

  const validationSchema = Joi.object<PostConfig>({
    environment: Joi.string().valid('development', 'production', 'stage').required(),
    prefix: Joi.string().valid('api').required(),
    port: Joi.number().port().default(DEFAULT_PORT),
  });

  const { error } = validationSchema.validate(config, { abortEarly: true });

  if (error) {
    throw new Error(
      `[Post Config]: Environments validation failed. Please check .env file.
      Error message: ${error.message}`,
    );
  }

  return config;
});
