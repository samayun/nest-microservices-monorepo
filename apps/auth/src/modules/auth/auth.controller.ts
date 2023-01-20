import { Controller } from '@nestjs/common';
import { UserService } from './user.service';

@Controller()
export class AuthController {
  constructor(private readonly authService: UserService) {}


}
