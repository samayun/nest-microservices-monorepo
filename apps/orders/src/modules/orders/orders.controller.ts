import { Controller, Get } from '@nestjs/common';
import { OrdersService } from './orders.service';

@Controller()
export class OrderController {
  constructor(private readonly appService: OrdersService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
