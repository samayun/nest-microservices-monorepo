import { ConfigService } from '@nestjs/config';
import { RabbitMqService } from './rabbitmq.service';
import { DynamicModule, Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

interface RmqModuleOptions {
  name: string;
}

@Module({
  providers: [RabbitMqService],
  exports: [RabbitMqService],
})
export class RabbitMqModule {
  static register({ name }: RmqModuleOptions): DynamicModule {
    return {
      module: RabbitMqModule,
      imports: [
        ClientsModule.registerAsync([
          {
            name,
            useFactory: (configService: ConfigService) => ({
              transport: Transport.RMQ,
              options: {
                urls: [configService.get<string>('RABBITMQ_URI')],
                queue: configService.get(`RABBITMQ_${name}_QUEUE`),
                noAck: false,
                persistent: true,
              },
            }),
            inject: [ConfigService],
          },
        ]),
      ],
      exports: [ClientsModule],
    };
  }
}
