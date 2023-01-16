import { HydratedDocument, Types } from 'mongoose';
import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@ObjectType({ description: 'This is Order Object type', isAbstract: true })
@Schema({ versionKey: false, timestamps: true })
export class Order {
  @Field(() => ID, { nullable: true, description: 'Order ID' })
  id: Types.ObjectId;

  @Prop()
  @Field(() => String, { nullable: true, description: 'Order Name' })
  name: string;

  @Prop({ required: false })
  @Field(() => Int, { nullable: true, description: 'Order price' })
  price: number;

  @Prop()
  @Field(() => String, { nullable: true, description: 'phoneNumber' })
  phoneNumber: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
export type OrderDocument = HydratedDocument<Order>;
