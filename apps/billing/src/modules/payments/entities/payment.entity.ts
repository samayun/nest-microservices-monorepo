import { HydratedDocument } from 'mongoose';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema({ versionKey: false, timestamps: true })
@ObjectType()
export class Payment {
  @Field(() => ID, { nullable: true, description: 'Payment ID' })
  id: string;

  @Prop()
  @Field(() => String, { nullable: true })
  name: string;

  @Prop()
  @Field(() => String, { nullable: true })
  email: string;

  @Field(() => String, { nullable: true })
  @Prop()
  password: string;
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);
export type PaymentDocument = HydratedDocument<Payment>;
