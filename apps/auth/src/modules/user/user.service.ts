import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.entity';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async getHello() {
    return {
      users: await this.findAll(),
    };
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().sort({ createdAt: -1 }).skip(0).limit(10);
  }

  async findOne(id: string) {
    const user = await this.userModel.findById(id);

    if (!user) throw new Error(`${id} user not found`);

    return user;
  }
}
