import * as Joi from 'joi';
import { Module } from '@nestjs/common';
// import { BILLING_SERVICE } from './constants';
import { ConfigModule } from '@nestjs/config';
import { GraphqlModule } from './loaders/graphql.module';
import OrderModule from './modules/orders/orders.module';
import { DatabaseModule } from '@app/common';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        MONGODB_URI: Joi.string().required(),
        RABBITMQ_URI: Joi.string().required(),
        RABBITMQ_BILLING_QUEUE: Joi.string().required(),
        PORT: Joi.number().required(),
      }),
      envFilePath: './apps/orders/.env',
    }),
    DatabaseModule,
    GraphqlModule,
    OrderModule,
  ],
})
export class AppModule {}
