import 'reflect-metadata';
import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import bodyParser from 'body-parser';
import http from 'http';
import swaggerApi from './router/swagger.json';
import { RegisterRoutes } from './router/routes';
import { logger } from './core/logger';
import { appConfig } from './core/config';
import { ValidateError } from 'tsoa';
import { HandingError } from './modules/utils/HandingError';
import { initDb } from './core/db/init';

async function bootstrap() {
  const app = express();
  const httpServer = http.createServer(app);

  app.use(cors());
  app.use(bodyParser.json({ limit: '50mb' }));

  app.use(
    '/docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerApi, { explorer: false }),
  );

  RegisterRoutes(app);

  app.use(function notFoundHandler(_req: Request, res: Response) {
    res.status(404).send({
      message: 'Not Found',
    });
  });

  app.use(function errorHandler(
    err: unknown,
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    if (err instanceof ValidateError) {
      logger.warn(`Caught Validation Error for ${req.path}:`, err.fields);
      return res.status(422).json({
        message: 'Validation Failed',
        details: err?.fields,
      });
    }
    if (err instanceof HandingError) {
      logger.warn(`Caught Handing error for ${req.path}:`, err);
      return res.status(err.status).json({
        message: err.message,
      });
    }
    if (err instanceof Error) {
      return res.status(500).json({
        message: 'Internal Server Error',
      });
    }

    next();
  });

  await initDb();

  httpServer.listen(appConfig.port, () => {
    logger.info(`Server is running on http://localhost:${appConfig.port}`);
  });
}

void bootstrap();
