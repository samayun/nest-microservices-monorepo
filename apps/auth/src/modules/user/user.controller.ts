import { UserService } from './user.service';
// import { ApiBody } from '@nestjs/swagger';
import { Body, Controller, Get , Post } from '@nestjs/common';
import { LoginUserInput } from './auth.input';



@Controller('v1/auth')
export class AuthController {
  constructor(private readonly authService: UserService) {}

  @Get()
  getHello() {
    return this.authService.getHello();
  }

  @Post('login')
  login(@Body() loginUserInput:  LoginUserInput) {
    return this.authService.login(loginUserInput);
  }
}
