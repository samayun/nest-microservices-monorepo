import { Module } from '@nestjs/common';
import { BILLING_SERVICE } from '../../constants';
import { OrdersService } from './orders.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from './order.entity';
import { OrderController } from './orders.controller';
import { OrdersResolver } from './orders.resolver';
import { OrdersRepository } from './order.repository';
import { RabbitMqModule } from '@app/common';

@Module({
  imports: [
    RabbitMqModule.register({ name: BILLING_SERVICE }),
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
  ],
  controllers: [OrderController],
  providers: [OrdersRepository, OrdersResolver, OrdersService],
})
export default class OrderModule {}
