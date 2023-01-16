import * as Joi from 'joi';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BillingResolver } from './billing.resolver';
import { BillingController } from './billing.controller';
import { Billing, BillingSchema } from './billing.entity';
import { BillingService } from './billing.service';


console.log({ BillingService: process.env.MONGODB_URI });

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Billing.name, schema: BillingSchema }])
  ],
  controllers: [BillingController],
  providers: [BillingResolver,BillingService],
})
export class BillingModule {}
