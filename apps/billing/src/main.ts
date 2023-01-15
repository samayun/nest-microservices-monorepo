import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { serverConfig } from './config/server';
import setupSwaggerModule from './loaders/swagger.module';
import { globalPrefix, swaggerPrefix } from './config/api';
import { loadGlobalMiddlewares } from './loaders/middlewares.loader';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix(globalPrefix);

  loadGlobalMiddlewares(app);

  if (process.env.NODE_ENV === 'development') {
    setupSwaggerModule(app);
  }

  await app.listen(serverConfig.port);

  Logger.verbose(
    `🔥🚀 Billing Server is here => http://${serverConfig.host}:${serverConfig.port}`,
  );

  Logger.verbose(
    `> Documentation is here => http://${serverConfig.host}:${serverConfig.port}/${swaggerPrefix}`,
  );

  Logger.verbose(`> DB Connected : ${process.env.MONGODB_URI}`);

  Logger.verbose(
    `> GraphQL playground is here => http://${serverConfig.host}:${serverConfig.port}/graphql`,
  );
}
bootstrap();
