import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';

const DEFAULT_SMTP_PORT = 25;

export interface MailConfig {
    host: string | undefined;
    port: number;
    user: string | undefined;
    password: string | undefined;
    from: string | undefined;
    template: string | undefined;
}

export default registerAs('mail', (): MailConfig => {
  const config: MailConfig = {
      host: process.env['MONGO_HOST'],
      port: parseInt(process.env['MAIL_SMTR_PORT'] ?? DEFAULT_SMTP_PORT.toString(), 10),
      user: process.env['MONGO_USER'],
      password: process.env['MONGO_PASSWORD'],
      from: process.env['MAIL_FROM'],
      template: process.env['TEMPLATE']
  };

  const validationSchema = Joi.object<MailConfig>({
      host: Joi.string().valid().hostname().required(),
      port: Joi.number().port().default(DEFAULT_SMTP_PORT),
      user: Joi.string().required(),
      password: Joi.string().required(),
      from: Joi.string().required(),
      template: Joi.string().required()
  });

  const { error } = validationSchema.validate(config, { abortEarly: true });

  if (error) {
    throw new Error(
      `[Mail Config]: Environments validation failed. Please check .env file.
       Error message: ${error.message}`,
    );
  }

  return config;
});
