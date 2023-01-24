import { OrdersService } from './orders.service';
import { CreateOrderInput } from './dto/create-order.input';
import { Body, Controller, Get, Post } from '@nestjs/common';

@Controller('/v1/orders')
export class OrderController {
  constructor(private readonly orderService: OrdersService) {}

  @Get()
  getHello() {
    return this.orderService.getOrders();
  }

  @Post()
  createOrder(@Body() createOrderInput: CreateOrderInput) {
    return this.orderService.create(createOrderInput);
  }
}
