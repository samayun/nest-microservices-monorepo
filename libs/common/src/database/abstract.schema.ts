import { SchemaTypes } from 'mongoose';
// import { Field, ID } from '@nestjs/graphql';
import { Prop, Schema } from '@nestjs/mongoose';

@Schema()
export class AbstractDocument {
  @Prop({ type: SchemaTypes.ObjectId })
  // @Field(() => ID, { nullable: true, description: 'ID' })
  _id: string;
}
