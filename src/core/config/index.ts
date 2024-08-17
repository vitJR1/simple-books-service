import { config } from 'dotenv';
import { IConfig } from './interface/IConfig';
import getEnvOrFail from './utils/getEnvOrFail';

config();

export const appConfig: IConfig = {
  port: parseInt(getEnvOrFail('PORT'), 10),
  accessSecret: getEnvOrFail('ACCESS_SECRET'),
};
