import { Injectable } from '@nestjs/common';
import {
  GoogleAccountRegisterDto,
  GoogleCreateAccountDto,
} from 'src/modules/api/contracts/auth/register-contracts/simple-register.dto';
import { RegisterManagerService } from 'src/modules/core/managers/auth/register-manager.service';
import { EmailAuthService } from 'src/modules/infrastructure/extensions/auth/email-auth/email-auth.service';
import { GoogleAuthService } from 'src/modules/infrastructure/extensions/auth/google-auth/google-auth.service';
import { SesionAuthService } from 'src/modules/infrastructure/extensions/auth/sesison-auth/sesion-auth.service';

@Injectable()
export class GoogleAutBroker {
  constructor(
    private googleAuthService: GoogleAuthService,
    private registerManagerService: RegisterManagerService,
    private emailAuthService: EmailAuthService,
    private authService: SesionAuthService,
  ) {}
  async verifyGoogleToken(token: string) {
    const payload = await this.googleAuthService.verifyGoogleToken(token);
    const result = await this.registerManagerService.validateGoogleEmail(
      payload.email,
    );
    if (!result.exist) {
      const token = this.emailAuthService.generate(
        payload.email,
        result.exist,
        'google',
      );
      return { token: token, type: 'Create' };
    }
    const tokenResult = this.authService.getJwtToken({
      id: result.user!.idAccount,
      type: 'Sesion',
    });
    return { token: tokenResult, type: 'Sesion' };
  }

  async createGoogleAcoutn(dto: GoogleCreateAccountDto) {
    const account = await this.registerManagerService.createAccountGoogle(dto);
    const token = this.authService.getJwtToken({
      id: account.idAccount,
      type: 'Sesion',
    });
    return { token: token };
  }
}
