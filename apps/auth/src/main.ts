import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { serverConfig } from './config/server';
import { AuthModule } from './modules/auth/auth.module';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);
  await app.listen(serverConfig.port);

  Logger.verbose(
    `🔥🚀 Auth Server is here => http://${serverConfig.host}:${serverConfig.port}`,
  );
}
bootstrap();
