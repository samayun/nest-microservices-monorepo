import { HydratedDocument } from 'mongoose';
import { AbstractDocument } from '@app/common';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema({ versionKey: false })
export class Billing extends AbstractDocument {
  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop()
  password: string;
}

export const BillingSchema = SchemaFactory.createForClass(Billing);
export type BillingDocument = HydratedDocument<Billing>;
