import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { EmailVerificationPayload } from './interfaces/jwt-email-payload.interface';

@Injectable()
export class EmailAuthService {
  constructor(private readonly jwtService: JwtService) {}

  generate(
    email: string,
    registed: boolean,
    provider: 'google' | 'application',
  ) {
    return this.jwtService.sign({
      email,
      type: 'email-verification',
      registed,
      provider,
    });
  }

  verify(token: string) {
    const payload: EmailVerificationPayload = this.jwtService.verify(token);

    if (payload.type !== 'email-verification') {
      throw new UnauthorizedException();
    }

    return {
      email: payload.email,
      registed: payload.registed,
      provider: payload.provider,
    };
  }
}
