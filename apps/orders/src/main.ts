import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { serverConfig } from '@orders/config/server';
import { OrderModule } from '@orders/modules/order/order.module';


async function bootstrap() {
  const app = await NestFactory.create(OrderModule);
  await app.listen(serverConfig.port);

  Logger.verbose(
    `🔥🚀 Order Server is here => http://${serverConfig.host}:${serverConfig.port}`,
  );
}
bootstrap();
