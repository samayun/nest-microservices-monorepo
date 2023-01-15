import { HydratedDocument, Types } from 'mongoose';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema({ versionKey: false })
@ObjectType({ description: 'This is Billing Object type', isAbstract: true })
export class Billing  {

  @Field(() => ID, { nullable: true, description: 'Billing ID' })
  id: Types.ObjectId;

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

export const BillingSchema = SchemaFactory.createForClass(Billing);
export type BillingDocument = HydratedDocument<Billing>;
