import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';

const DEFAULT_RABBIT_PORT = 5552;

export interface Rabbit {
    host: string | undefined;
    password: string | undefined;
    user: string | undefined;
    queue: string | undefined;
    exchange: string | undefined;
    port: number;
}

export default registerAs('rabbit', (): Rabbit => {
  const config: Rabbit = {
      host: process.env['MONGO_HOST'],
      password: process.env['MONGO_PASSWORD'],
      port: parseInt(process.env['RABBIT_POST'] ?? DEFAULT_RABBIT_PORT.toString(), 10),
      user: process.env['MONGO_USER'],
      queue: process.env['RABBIT_QUEUE'],
      exchange: process.env['RABBIT_EXCHANGE'],
  };

  const validationSchema = Joi.object<Rabbit>({
      host: Joi.string().valid().hostname().required(),
      password: Joi.string().required(),
      port: Joi.number().port().default(DEFAULT_RABBIT_PORT),
      user: Joi.string().required(),
      queue: Joi.string().required(),
      exchange: Joi.string().required(),
  });

  const { error } = validationSchema.validate(config, { abortEarly: true });

  if (error) {
    throw new Error(
      `[User Config]: Environments validation failed. Please check .env file.
       Error message: ${error.message}`,
    );
  }

  return config;
});
