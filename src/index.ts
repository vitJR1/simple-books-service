import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import bodyParser from 'body-parser';
import http from 'http';
import swaggerApi from '../src/router/swagger.json';
import { RegisterRoutes } from './router/routes';
import { logger } from './core/logger';

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

  httpServer.listen(3000, () => {
    logger.info('Server is running on http://localhost:3000');
  });
}

void bootstrap();
