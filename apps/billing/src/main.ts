import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { serverConfig } from './config/server';
import { BillingModule } from './modules/billing/billing.module';

async function bootstrap() {
  const app = await NestFactory.create(BillingModule);
  await app.listen(serverConfig.port);
  Logger.verbose(
    `> Server is here => http://${serverConfig.host}:${serverConfig.port}/`,
  );
}
bootstrap();
