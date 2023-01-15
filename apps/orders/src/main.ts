import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { serverConfig } from './config/server';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(serverConfig.port);

  Logger.verbose(
    `🔥🚀 Order Server is here => http://${serverConfig.host}:${serverConfig.port}`,
  );
}
bootstrap();
