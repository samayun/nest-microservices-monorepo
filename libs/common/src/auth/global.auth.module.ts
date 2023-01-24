import { AUTH_SERVICE } from '..';
import cookieParser from 'cookie-parser';
import { RabbitMqModule } from '../rabbitmq/rabbitmq.module';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

@Module({
  imports: [RabbitMqModule.register({ name: AUTH_SERVICE })],
  exports: [RabbitMqModule],
})
export class GlobalAuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(cookieParser()).forRoutes('*');
  }
}
