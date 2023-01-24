import { AUTH_SERVICE } from './services';
// import * as cookieParser from 'cookie-parser';
import { RabbitMqModule } from '../rabbitmq/rabbitmq.module';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
@Module({
  imports: [RabbitMqModule.register({ name: AUTH_SERVICE })],
  exports: [RabbitMqModule],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    console.log(consumer);
    //     consumer.apply(cookieParser()).forRoutes('*');
  }
}
