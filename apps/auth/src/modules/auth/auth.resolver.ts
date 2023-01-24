// import { UseGuards } from '@nestjs/common';
import { User } from '../user/user.entity';
import { AuthService } from './auth.service';
import { SignupInput, LoginUserInput } from '../auth/auth.input';
// import { CurrentUser, GraphqlJwtAuthGuard } from '@app/common';
import { AccessTokenType } from '@auth/shared/typedefs/graphql.type';
import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';

@Resolver(() => User)
export class AuthResolver {
  constructor(private readonly userService: AuthService) {}

  @Mutation(() => AccessTokenType, { name: 'login' })
  async login(
    @Args('loginInput') loginUserInput: LoginUserInput,
    @Context('res') res: any,
  ) {
    const result = await this.userService.login(loginUserInput);

    res.cookie('accessToken', result?.accessToken);
    res.cookie('refreshToken', result?.refreshToken);

    return result;
  }

  @Mutation(() => AccessTokenType, { name: 'signup' })
  async signup(
    @Args('signupInput') signupInput: SignupInput,
    @Context('res') res: any,
  ) {
    const result = await this.userService.signup(signupInput);

    res.cookie('accessToken', result?.accessToken);
    res.cookie('refreshToken', result?.refreshToken);

    return result;
  }

  @Mutation(() => AccessTokenType, { name: 'refreshToken' })
  async refreshToken(@Context('req') req: any, @Context('res') res: any) {
    const result = await this.userService.refreshToken(req);
    res.cookie('accessToken', result?.accessToken);

    return result;
  }

  @Mutation(() => String, { name: 'logout' })
  async logout(@Context('res') res: any) {
    return this.userService.logout(res);
  }

  // @Query(() => User, { name: 'me' })
  // @UseGuards(GraphqlJwtAuthGuard)
  // async me(@CurrentUser() user: typeof CurrentUser) {
  //   return this.userService.getProfile(user);
  // }
}
