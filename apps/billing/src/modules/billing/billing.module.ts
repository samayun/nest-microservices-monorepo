import { Module } from '@nestjs/common';
import { RabbitMqModule } from '@app/common';
import { BillingService } from './billing.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BillingResolver } from './billing.resolver';
import { BillingController } from './billing.controller';
import { Billing, BillingSchema } from './billing.entity';

console.log({ BillingService: process.env.MONGODB_URI });

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Billing.name, schema: BillingSchema }]),
    RabbitMqModule,
  ],
  controllers: [BillingController],
  providers: [BillingResolver, BillingService],
  exports: [BillingResolver, BillingService],
})
export class BillingModule {}
