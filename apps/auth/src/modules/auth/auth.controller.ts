// import { JwtAuthGuard } from '@app/common';
import { AuthService } from './auth.service';
import { LoginUserInput } from './auth.input';
import { MessagePattern } from '@nestjs/microservices';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';

@Controller('v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() loginUserInput: LoginUserInput) {
    return this.authService.login(loginUserInput);
  }

  // @UseGuards(JwtAuthGuard)
  @MessagePattern('validate_user')
  async validateUser() {
    return 'user';
  }
}
