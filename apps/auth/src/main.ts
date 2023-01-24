import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { QUEUE_SERVICE } from './constants';
import { RabbitMqService } from '@app/common';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { serverConfig } from '@orders/config/server';
import setupSwaggerModule from './loaders/swagger.module';
import { globalPrefix, swaggerPrefix } from './config/api';
import { loadGlobalMiddlewares } from './loaders/middlewares.loader';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix(globalPrefix);

  const rmqService = app.get<RabbitMqService>(RabbitMqService);
  app.connectMicroservice(rmqService.getOptions(QUEUE_SERVICE));

  loadGlobalMiddlewares(app);

  app.useGlobalPipes(new ValidationPipe());
  const configService = app.get(ConfigService);

  await app.startAllMicroservices();

  Logger.verbose(`🔥🚀 MicroServices Started : ${QUEUE_SERVICE}`);

  if (process.env.NODE_ENV === 'development') {
    setupSwaggerModule(app);
  }

  await app.listen(configService.get('PORT'));

  Logger.verbose(
    `🔥🚀 Auth Server is here => http://${
      serverConfig.host
    }:${configService.get('PORT')}`,
  );
  if (process.env.NODE_ENV === 'development') {
    Logger.verbose(
      `> Documentation is here => http://${
        serverConfig.host
      }:${configService.get('PORT')}/${swaggerPrefix}`,
    );
  }

  Logger.verbose(`> DB Connected : ${process.env.MONGODB_URI}`);

  Logger.verbose(
    `> GraphQL playground is here => http://${
      serverConfig.host
    }:${configService.get('PORT')}/graphql`,
  );
}
bootstrap();
