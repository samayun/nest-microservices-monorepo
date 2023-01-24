import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { BILLING_SERVICE } from '@orders/constants';
import { lastValueFrom } from 'rxjs';
import { CreateOrderInput } from './dto/create-order.input';
import { UpdateOrderInput } from './dto/update-order.input';
import { OrdersRepository } from './order.repository';

@Injectable()
export class OrdersService {
  constructor(
    private ordersRepository: OrdersRepository,
    @Inject(BILLING_SERVICE) private billingClient: ClientProxy,
  ) {}

  async create(createOrderInput: CreateOrderInput) {
    // const session = await this.ordersRepository.startTransaction();
    try {
      const order = this.ordersRepository.create(
        createOrderInput,
        // { session }
      );

      await lastValueFrom(
        this.billingClient.emit('order_created', {
          payload: createOrderInput,
        }),
      );
      // await session.commitTransaction();
      return order;
    } catch (error) {
      // await session.abortTransaction();
      throw error;
    }
  }

  async getOrders() {
    return this.ordersRepository.find({});
  }

  async findOne(id: string) {
    return this.ordersRepository.findOne({ _id: id });
  }

  async update(id: string, updateOrderInput: UpdateOrderInput) {
    return this.ordersRepository.findOneAndUpdate(
      { _id: id },
      updateOrderInput,
    );
  }

  async remove(id: string) {
    return this.ordersRepository.findOne({ _id: id });
  }
}
