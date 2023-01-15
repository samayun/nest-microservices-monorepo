import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateOrderInput } from './dto/create-order.input';
import { UpdateOrderInput } from './dto/update-order.input';
import { Order, OrderDocument } from './order.entity';

@Injectable()
export class OrdersService {
  constructor(@InjectModel(Order.name) private orderModel: Model<OrderDocument>) {}
  
  async create(createOrderInput: CreateOrderInput) {
    const createdOrder = new this.orderModel(createOrderInput);
    return createdOrder.save();
  }

    
  getHello(): string {
    return 'Here are orders!';
  }
  
  async findAll(): Promise<Order[]> {
    return this.orderModel.find().sort({ createdAt: -1 }).skip(0).limit(10);
  }

  async findOne(id: string) {
    const order = await this.orderModel.findById(id);

    if (!order) throw new Error(`${id} order not found`);

    return order;
  }

  async update(id: string, updateOrderInput: UpdateOrderInput) {
    return this.orderModel.findByIdAndUpdate(id, updateOrderInput);
  }

  async remove(id: string) {
    return this.orderModel.findByIdAndRemove(id);
  }
}
