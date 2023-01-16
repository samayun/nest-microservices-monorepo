import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Payment, PaymentDocument } from './entities/payment.entity';
import { CreatePaymentInput } from './dto/create-payment.input';
import { UpdatePaymentInput } from './dto/update-payment.input';

@Injectable()
export class PaymentService {
  constructor(
    @InjectModel(Payment.name) private paymentModel: Model<PaymentDocument>,
  ) {}

  async create(createPaymentInput: CreatePaymentInput) {
    const createdPayment = new this.paymentModel(createPaymentInput);
    return createdPayment.save();
  }

  getHello(): string {
    return 'Hello Biller!';
  }

  async findAll(): Promise<Payment[]> {
    return this.paymentModel.find().sort({ createdAt: -1 }).skip(0).limit(10);
  }

  async findOne(id: string) {
    const payment = await this.paymentModel.findById(id);

    if (!payment) throw new Error(`${id} payment not found`);

    return payment;
  }

  async update(id: string, updatePaymentInput: UpdatePaymentInput) {
    return this.paymentModel.findByIdAndUpdate(id, updatePaymentInput);
  }

  async remove(id: string) {
    return this.paymentModel.findByIdAndRemove(id);
  }
}
