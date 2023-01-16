// import { OrdersService } from './orders.service';
import { OrdersRepository } from './order.repository';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateOrderInput } from './dto/create-order.input';

@Controller('/v1/orders')
export class OrderController {
  constructor(private readonly orderService: OrdersRepository) {}

  @Get()
  getHello() {
    return this.orderService.findAll();
  }

  @Post()
  createOrder(@Body() createOrderInput: CreateOrderInput) {
    return this.orderService.create(createOrderInput as any);
  }
}
