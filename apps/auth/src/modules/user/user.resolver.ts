import { User } from './user.entity';
import { UserService } from './user.service';
import { SignupInput, LoginUserInput } from './auth.input';
import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { AccessTokenType } from './auth.type';
import { UseGuards } from '@nestjs/common';
import { CurrentUser, GraphqlJwtAuthGuard } from '@app/common';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) { }

  @Query(() => AccessTokenType, { name: 'login' })
  async login(
    @Args('loginUserInput') loginUserInput: LoginUserInput,
    @Context('res') res: any
  ) {
    const result = await this.userService.login(loginUserInput);

    res.cookie('accessToken', result?.accessToken);
    res.cookie('refreshToken', result?.refreshToken);

    return result;
  }

  @Mutation(() => AccessTokenType, { name: 'signup' })
  async signup(@Args('signupInput') signupInput: SignupInput, @Context('res') res: any) {
    const result = await this.userService.signup(signupInput);

    res.cookie('accessToken', result?.accessToken);
    res.cookie('refreshToken', result?.refreshToken);

    return result;
  }

  @Mutation(() => AccessTokenType, { name: 'refreshToken' })
  async refreshToken(
    @Context('req') req: any,
    @Context('res') res: any
  ) {
    const result = await this.userService.refreshToken(req);
    res.cookie('accessToken', result?.accessToken);

    return result;

  }


  @Mutation(() => String, { name: 'logout' })
  async logout(@Context('res') res: any) {
    return this.userService.logout(res);
  }

  @Query(() => User, { name: 'me' })
  @UseGuards(GraphqlJwtAuthGuard)
  async me(@CurrentUser() user: typeof CurrentUser) {
    return this.userService.getProfile(user);
  }

  @Query(() => [User], { name: 'users' })
  findAll() {
    return this.userService.findAll();
  }

  @Query(() => User, { name: 'user' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.userService.findOne(id);
  }
}
