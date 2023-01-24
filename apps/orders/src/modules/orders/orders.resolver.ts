import { Order } from './order.entity';
import { OrdersService } from './orders.service';
import { CreateOrderInput } from './dto/create-order.input';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';

@Resolver(() => Order)
export class OrdersResolver {
  constructor(private readonly ordersService: OrdersService) {}

  @Mutation(() => Order, { name: 'createOrder' })
  createOrder(@Args('createOrderInput') createOrderInput: CreateOrderInput) {
    return this.ordersService.create(createOrderInput);
  }

  @Query(() => [Order], { name: 'orders' })
  getOrders() {
    return this.ordersService.getOrders();
  }

  @Query(() => Order, { name: 'order' })
  findOrder(@Args('id', { type: () => String }) id: string) {
    return this.ordersService.findOne(id);
  }
}
