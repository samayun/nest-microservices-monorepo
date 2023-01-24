import bcrypt from 'bcryptjs';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { authConfig } from '@auth/config/auth';
import { InjectModel } from '@nestjs/mongoose';
import { LoginUserInput, SignupInput } from './auth.input';
import { User, UserDocument } from '../user/user.entity';

@Injectable()
export class AuthService extends JwtService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {
    super();
  }

  generateToken(user: Record<string, any>, role: string) {
    const payload = {
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
      },
      role,
    };
    return {
      accessToken: this.sign(payload, authConfig.accessToken),
      refreshToken: this.sign(payload, authConfig.refreshToken),
    };
  }

  verifyToken(token: string) {
    return this.verify(token, {
      issuer: authConfig.accessToken.issuer,
      secret: authConfig.accessToken.secret,
    });
  }

  verifyRefreshToken(token: string) {
    return this.verify(token, {
      issuer: authConfig.refreshToken.issuer,
      secret: authConfig.refreshToken.secret,
    });
  }

  async signup(signupInput: SignupInput) {
    const createdUser = new this.userModel(signupInput);
    createdUser.password = bcrypt.hashSync(signupInput.password, 10);
    const user = await createdUser.save();
    const payload = {
      _id: user._id,
      name: user.name,
      email: user.email,
    };
    return this.generateToken(payload, 'user');
  }

  async login(loginUserInput: LoginUserInput) {
    const user = await this.userModel.findOne({ email: loginUserInput.email });

    if (!user) throw new Error(`User doesn't exist`);

    const matched = bcrypt.compareSync(loginUserInput.password, user.password);

    if (!matched) throw new Error(`Password doesn't match`);

    return this.generateToken(user, 'user');
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

    const token: any = this.verifyRefreshToken(refreshToken);

    const user = token?.user;

    if (!user?._id) throw new Error(`No User Found`);

    const dbUser = await this.userModel.findById(user?._id);

    if (!dbUser) throw new Error(`No User Found`);

    return this.generateToken(dbUser, 'user');
  }

  async logout(res: any) {
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    return 'logout success';
  }
}
