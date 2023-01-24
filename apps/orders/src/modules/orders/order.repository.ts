import { Connection, Model } from 'mongoose';
import { Injectable, Logger } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Order, OrderDocument } from './order.entity';
import { AbstractRepository } from '@app/common';

@Injectable()
export class OrdersRepository extends AbstractRepository<OrderDocument> {
  protected readonly logger = new Logger(Order.name);

  constructor(
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
    @InjectConnection() connection: Connection,
  ) {
    super(orderModel, connection);
  }
}
