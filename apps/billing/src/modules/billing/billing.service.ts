import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Billing, BillingDocument } from './billing.entity';
import { CreateBillingInput } from './dto/create-billing.input';
import { UpdateBillingInput } from './dto/update-billing.input';

@Injectable()
export class BillingService {
  constructor(
    @InjectModel(Billing.name) private billingModel: Model<BillingDocument>,
  ) {}

  async create(createBillingInput: CreateBillingInput) {
    const createdBilling = new this.billingModel(createBillingInput);
    return createdBilling.save();
  }

  getHello(): string {
    return 'Hello Biller!';
  }

  async findAll(): Promise<Billing[]> {
    return this.billingModel.find().sort({ createdAt: -1 }).skip(0).limit(10);
  }

  async findOne(id: string) {
    const billing = await this.billingModel.findById(id);

    if (!billing) throw new Error(`${id} billing not found`);

    return billing;
  }

  async update(id: string, updateBillingInput: UpdateBillingInput) {
    return this.billingModel.findByIdAndUpdate(id, updateBillingInput);
  }

  async remove(id: string) {
    return this.billingModel.findByIdAndRemove(id);
  }
}
