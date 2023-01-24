import { User } from './user.entity';
import { UserService } from './user.service';
import { CreateUserInput } from './dto/create-user.input';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => User)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.userService.create(createUserInput);
  }

  @Query(() => [User], { name: 'users' })
  users() {
    return this.userService.findAll();
  }

  @Query(() => User, { name: 'user' })
  user(@Args('id', { type: () => String }) id: string) {
    return this.userService.findOne(id);
  }

  @Query(() => User, { name: 'me' })
  me(@Args('id', { type: () => String }) id: string) {
    return this.userService.findOne(id);
  }
}
