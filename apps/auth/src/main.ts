import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { serverConfig } from './config/server';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);
  await app.listen(serverConfig.port);

  Logger.verbose(
    `🔥🚀 Auth Server is here => http://${serverConfig.host}:${serverConfig.port}`,
  );
}
bootstrap();
