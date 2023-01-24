import { HydratedDocument } from 'mongoose';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema({ versionKey: false, timestamps: true })
@ObjectType({ description: 'This is Billing Object type', isAbstract: true })
export class Billing {
  @Field(() => ID, { nullable: true, description: 'Billing ID' })
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

  @Prop({
    type: Object,
  })
  order: Record<string, any>;
}

export const BillingSchema = SchemaFactory.createForClass(Billing);
export type BillingDocument = HydratedDocument<Billing>;
