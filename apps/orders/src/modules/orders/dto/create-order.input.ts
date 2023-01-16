import {
  IsNotEmpty,
  IsPhoneNumber,
  IsPositive,
  IsString,
} from 'class-validator';

import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateOrderInput {
  @IsString()
  @IsNotEmpty()
  @Field(() => String, { description: 'name field (placeholder)' })
  name: string;

  @IsPositive()
  @Field(() => Int, { description: 'price field (placeholder)' })
  price: number;

  @IsPhoneNumber()
  @Field(() => String, { description: 'Example field (placeholder)' })
  phoneNumber: string;
}
