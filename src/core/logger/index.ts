import winston from 'winston';

export const logger = winston.createLogger({
  level: 'debug',
  format: winston.format.json(),
  defaultMeta: { category: 'access_log' },
  transports: [new winston.transports.Console()],
});
