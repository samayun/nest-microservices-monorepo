import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { authConfig } from '@auth/config/auth';

@Injectable()
export class AuthService extends JwtService {
  generateToken(user: Record<string, any>, role: string) {
    return {
      accessToken: this.sign({ user, role }, authConfig.accessToken),
      refreshToken: this.sign({ user, role }, authConfig.refreshToken),
    };
  }

  verifyToken(token: string) {
    return this.verify(token, { issuer: authConfig.accessToken.issuer });
  }
}
