import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AccessTokenType {
  @Field(() => String)
  accessToken: string;
}
