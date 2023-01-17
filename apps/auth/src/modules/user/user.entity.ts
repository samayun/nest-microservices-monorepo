import { HydratedDocument, Types } from 'mongoose';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@ObjectType({ description: 'This is User Object type', isAbstract: true })
@Schema({ versionKey: false })
export class User {
  @Field(() => ID, { nullable: true, description: 'User ID' })
  id: Types.ObjectId;

  @Prop()
  @Field(() => String, { description: 'User Name' })
  name: string;

  @Prop({ unique: true })
  @Field(() => String, { description: 'User Email' })
  email: string;

  @Prop({ })
  @Field(() => String, { description: 'User phone' })
  phone: string;

  @Prop()
  password: string;

  @Prop({default: 'ACTIVE'})
  @Field(() => String, { description: 'User status' })
  status: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
export type UserDocument = HydratedDocument<User>;
