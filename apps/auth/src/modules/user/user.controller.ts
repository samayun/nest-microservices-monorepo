import { UserService } from './user.service';
// import { ApiBody } from '@nestjs/swagger';
import { Controller, Get } from '@nestjs/common';

@Controller('v1/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getHello() {
    return this.userService.getHello();
  }
}
