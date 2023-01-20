import { Module } from '@nestjs/common';
import { RabbitMqService } from './rabbitmq.service';

@Module({
    providers: [RabbitMqService]
})
export class RabbitMqModule {}
