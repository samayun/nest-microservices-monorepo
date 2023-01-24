import { ApiQuery } from '@nestjs/swagger';
import { RabbitMqService } from '@app/common';
import { BillingService } from './billing.service';
import { Controller, Get, Query } from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';

@Controller()
export class BillingController {
  constructor(
    private readonly billingService: BillingService,
    private readonly rabbitMqService: RabbitMqService,
  ) {}

  @Get()
  getHello(): string {
    return this.billingService.getHello();
  }

  @Get('order_created')
  @ApiQuery({
    name: 'data',
    type: String,
  })
  @EventPattern('order_created')
  handleOrderCreated(
    @Payload() payload: any,
    @Ctx() context: RmqContext,
    @Query('data') query: any,
  ) {
    const data = query || payload;
    this.billingService.bill(data);
    this.rabbitMqService.ack(context);
  }
}
