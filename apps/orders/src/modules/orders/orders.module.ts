import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from './order.entity';
import { OrderController } from './orders.controller';
import { OrdersResolver } from './orders.resolver';
import { OrdersRepository } from './order.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
  ],
  controllers: [OrderController],
  providers: [OrdersRepository, OrdersResolver, OrdersService],
})
export default class OrderModule {}
