import { HydratedDocument, Types } from 'mongoose';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@ObjectType({ description: 'This is User Object type', isAbstract: true })
@Schema({ versionKey: false })
export class User {
  @Field(() => ID, { nullable: true, description: 'User ID' })
  id: Types.ObjectId;

  @Prop()
  @Field(() => String, { nullable: true, description: 'User Name' })
  name: string;

  @Prop({ unique: true })
  @Field(() => String, { nullable: true, description: 'User Email' })
  email: string;

  @Prop()
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
export type UserDocument = HydratedDocument<User>;
