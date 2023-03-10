import * as Joi from 'joi';
import { Module } from '@nestjs/common';
import { DatabaseModule } from '@app/common';
import { ConfigModule } from '@nestjs/config';
import { GraphqlModule } from './loaders/graphql.module';
import { BillingModule } from './modules/billing/billing.module';
import { PaymentsModule } from './modules/payments/payments.module';

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
      envFilePath: './apps/billing/.env',
    }),

    DatabaseModule,
    GraphqlModule,
    BillingModule,
    PaymentsModule,
  ],
})
export class AppModule {}
