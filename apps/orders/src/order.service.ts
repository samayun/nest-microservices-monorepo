import { Injectable } from '@nestjs/common';

@Injectable()
export class OrderService {
  getHello(): string {
    return 'Here are orders!';
  }
}
