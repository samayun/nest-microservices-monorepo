import { Billing } from './billing.entity';
import { BillingService } from './billing.service';
import { CreateBillingInput } from './dto/create-billing.input';
import { UpdateBillingInput } from './dto/update-billing.input';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';

@Resolver(() => Billing)
export class BillingResolver {
  constructor(private readonly billingService: BillingService) {}

  @Mutation(() => Billing)
  createBilling(
    @Args('createBillingInput') createBillingInput: CreateBillingInput,
  ) {
    return this.billingService.create(createBillingInput);
  }

  @Query(() => [Billing], { name: 'billings' })
  findAll() {
    return this.billingService.findAll();
  }

  @Query(() => Billing, { name: 'billing' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.billingService.findOne(id);
  }

  @Mutation(() => Billing)
  updateBilling(
    @Args('id', { type: () => String }) id: string,
    @Args('updateBillingInput') updateBillingInput: UpdateBillingInput,
  ) {
    return this.billingService.update(id, updateBillingInput);
  }

  @Mutation(() => Billing)
  removeBilling(@Args('id', { type: () => String }) id: string) {
    return this.billingService.remove(id);
  }
}
