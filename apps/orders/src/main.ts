import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { serverConfig } from '@orders/config/server';
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
    `🔥🚀 Order Server is here => http://${serverConfig.host}:${serverConfig.port}`,
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
