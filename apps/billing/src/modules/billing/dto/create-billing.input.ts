import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateBillingInput {
  @Field(() => String, { description: 'name field (placeholder)' })
  name: string;

  @Field(() => String, { description: 'price field (placeholder)' })
  email: string;

  @Field(() => String, { description: 'Example field (placeholder)' })
  password: string;

}
