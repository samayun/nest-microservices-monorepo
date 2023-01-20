
import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { RabbitMqService } from '@app/common';
import { serverConfig } from './config/server';
import { QUEUE_SERVICE } from './constants';
import { Logger, ValidationPipe } from '@nestjs/common';
import setupSwaggerModule from './loaders/swagger.module';
import { globalPrefix, swaggerPrefix } from './config/api';
import { loadGlobalMiddlewares } from './loaders/middlewares.loader';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const rmqService  = app.get<RabbitMqService>(RabbitMqService);
  
  app.connectMicroservice(rmqService.getOptions(QUEUE_SERVICE));

  app.setGlobalPrefix(globalPrefix);

  loadGlobalMiddlewares(app);

  app.useGlobalPipes(new ValidationPipe());

  if (process.env.NODE_ENV === 'development') {
    setupSwaggerModule(app);
  }

  await app.startAllMicroservices();

  Logger.verbose(
    `🔥🚀 MicroServices Started : ${QUEUE_SERVICE}`,
  );

  await app.listen(serverConfig.port);


  Logger.verbose(
    `🔥🚀 Billing Server is here => http://${serverConfig.host}:${serverConfig.port}`,
  );

  if (process.env.NODE_ENV === 'development') {
    Logger.verbose(
      `> Documentation is here => http://${serverConfig.host}:${serverConfig.port}/${swaggerPrefix}`,
    );
  }

  Logger.verbose(`> DB Connected : ${process.env.MONGODB_URI}`);

  Logger.verbose(
    `> GraphQL playground is here => http://${serverConfig.host}:${serverConfig.port}/graphql`,
  );
}
bootstrap();
