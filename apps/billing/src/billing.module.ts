import * as Joi from 'joi';
import { Module } from '@nestjs/common';
import { DatabaseModule } from '@app/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Billing, BillingSchema } from './billing.entity';
import { BillingController } from './billing.controller';
import { BillingService } from './billing.service';

console.log({ BillingService: process.env.MONGODB_URI });

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        MONGODB_URI: Joi.string().required(),
        PORT: Joi.number().required(),
      }),
      envFilePath: './apps/auth/.env',
    }),
    MongooseModule.forFeature([{ name: Billing.name, schema: BillingSchema }]),
    DatabaseModule,
  ],
  controllers: [BillingController],
  providers: [BillingService],
})
export class BillingModule {}
