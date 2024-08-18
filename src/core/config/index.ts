import { config } from 'dotenv';
import { IConfig } from './interface/IConfig';
import getEnvOrFail from './utils/getEnvOrFail';
import getEnv from './utils/getEnv';

config();

export const appConfig: IConfig = {
  port: parseInt(getEnvOrFail('PORT'), 10),
  host: getEnvOrFail('HOST'),
  accessSecret: getEnvOrFail('ACCESS_SECRET'),
  mailgunApiKey: getEnv('MAILGUN_API_KEY'),
  mailgunDomain: getEnv('MAILGUN_DOMAIN'),
};
