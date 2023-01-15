import * as Joi from 'joi';
import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { DatabaseModule } from '@app/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderController } from './order.controller';
import { Order, OrderSchema } from './order.entity';

console.log({ orderDb: process.env.MONGODB_URI });

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        MONGODB_URI: Joi.string().required(),
        PORT: Joi.number().required(),
      }),
      envFilePath: './apps/orders/.env',
    }),
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
    DatabaseModule,
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
