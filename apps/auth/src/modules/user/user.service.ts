import bcrypt from 'bcryptjs';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { SignupInput, LoginUserInput } from './auth.input';
import { User, UserDocument } from './user.entity';
import { AuthService } from './auth.service';

@Injectable()
export class UserService extends AuthService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {
    super();
  }

  async signup(signupInput: SignupInput) {
    const createdUser = new this.userModel(signupInput);
    createdUser.password = bcrypt.hashSync(signupInput.password, 10);
    const user = await createdUser.save();
    const payload = {
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
    };
    return this.generateToken(payload, 'user');
  }

  async login(loginUserInput: LoginUserInput) {
    const user = await this.userModel.findOne({ email: loginUserInput.email });

    if (!user) throw new Error(`User doesn't exist`);

    const matched = bcrypt.compareSync(loginUserInput.password, user.password);

    if (!matched) throw new Error(`Password doesn't match`);

    const payload = {
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
    };
    return this.generateToken(payload, 'user');
  }

  async getProfile(user: any) {
    if (!user) throw new Error(`user not found`);

    const authUser = await this.userModel.findById(user._id);

    if (!authUser) throw new Error(`${user._id} user not found`);

    return authUser;
  }

  async refreshToken(req: any) {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) throw new Error(`No Token Found`);

    const token: any = this.verifyToken(refreshToken);

    const user = token?.user;

    if (!user?._id) throw new Error(`No User Found`);

    const dbUser = await this.userModel.findById(user?._id);

    if (!dbUser) throw new Error(`No User Found`);

    const payload = {
      _id: dbUser._id,
      name: dbUser.name,
      email: dbUser.email,
      phone: dbUser.phone,
    };

    return this.generateToken(payload, 'user');
  }

  async logout(res: any) {
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    return 'logout success';
  }

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
