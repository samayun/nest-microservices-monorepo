import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateOrderInput {
  @Field(() => String, { description: 'name field (placeholder)' })
  name: string;

  @Field(() => Int, { description: 'price field (placeholder)' })
  price: number;

  @Field(() => String, { description: 'Example field (placeholder)' })
  phoneNumber: string;

}
