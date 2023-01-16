import { ApiQuery } from '@nestjs/swagger';
import { BillingService } from './billing.service';
import { Controller, Get, Query } from '@nestjs/common';

@Controller()
export class BillingController {
  constructor(private readonly billingService: BillingService) {}

  @Get()
  getHello(): string {
    return this.billingService.getHello();
  }

  @Get('order_created')
  @ApiQuery({
    name: 'data',
    type: String,
  })
  handleOrderCreated(@Query('data') data: any) {
    return this.billingService.bill(data);
  }
}
