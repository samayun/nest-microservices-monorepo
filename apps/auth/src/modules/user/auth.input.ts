import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

@InputType()
export class SignupInput {
  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  name: string;

  @IsNotEmpty()
  @IsEmail()
  @Field(() => String)
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @Field(() => String)
  password: string;
}

@InputType()
export class LoginUserInput {
  @IsNotEmpty()
  @IsEmail()
  @Field(() => String)
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @Field(() => String)
  password: string;
}
