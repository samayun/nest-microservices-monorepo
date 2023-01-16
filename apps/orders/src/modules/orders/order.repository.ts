import { Connection, Model } from 'mongoose';
import { Injectable, Logger } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { UpdateOrderInput } from './dto/update-order.input';
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

  async findAll(): Promise<Order[]> {
    return this.orderModel.find().sort({ createdAt: -1 }).skip(0).limit(10);
  }

  async update(id: string, updateOrderInput: UpdateOrderInput) {
    return this.orderModel.findByIdAndUpdate(id, updateOrderInput);
  }

  async remove(id: string) {
    return this.orderModel.findByIdAndRemove(id);
  }
}
