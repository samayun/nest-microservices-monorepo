import * as Joi from 'joi';
import { Module } from '@nestjs/common';
import { DatabaseModule } from '@app/common';
import { ConfigModule } from '@nestjs/config';
import { GraphqlModule } from './loaders/graphql.module';
import { BillingModule } from './modules/billing/billing.module';

@Module({
  imports: [
    ConfigModule.forRoot({
        isGlobal: true,
        validationSchema: Joi.object({
          MONGODB_URI: Joi.string().required(),
          PORT: Joi.number().required(),
        }),
        envFilePath: './apps/billing/.env',
      }),
    DatabaseModule,
    // GraphqlModule,
    BillingModule
  ]
})
export class AppModule {}
