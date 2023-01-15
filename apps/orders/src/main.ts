import { Logger } from '@nestjs/common';
import { OrderModule } from './order.module';
import { NestFactory } from '@nestjs/core';
import { serverConfig } from './config/server';

async function bootstrap() {
  const app = await NestFactory.create(OrderModule);
  await app.listen(serverConfig.port);

  Logger.verbose(
    `🔥🚀 Order Server is here => http://${serverConfig.host}:${serverConfig.port}`,
  );
}
bootstrap();
