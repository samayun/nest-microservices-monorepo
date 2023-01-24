import { AuthService } from './auth.service';
import { LoginUserInput } from './auth.input';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() loginUserInput: LoginUserInput) {
    return this.authService.login(loginUserInput);
  }
}
