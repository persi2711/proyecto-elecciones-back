import { Injectable } from '@nestjs/common';
import { SimpleLoginDto } from 'src/modules/api/contracts/auth/login-contracts/simple-login.dto';
import { SimpleRegisterDto } from 'src/modules/api/contracts/auth/register-contracts/simple-register.dto';
import { LoginManagerService } from 'src/modules/core/managers/auth/login-manager.service';
import { RegisterManagerService } from 'src/modules/core/managers/auth/register-manager.service';
import { authService } from 'src/modules/infrastructure/extensions/auth/auth.service';
import { EmailService } from 'src/modules/infrastructure/extensions/emails/email.service';

@Injectable()
export class SimpleAuthBroker {
  constructor(
    private loginManagerService: LoginManagerService,
    private authService: authService,
    private registerManagerService: RegisterManagerService,
    private emailService: EmailService,
  ) {}

  async simpleRegister(dto: SimpleRegisterDto) {
    const result = await this.registerManagerService.createAccountSimple(dto);
    await this.emailService.sendVerificationEmail(
      result.email,
      result.rawToken,
    );
  }

  async simpleLogin(dto: SimpleLoginDto) {
    const acount = await this.loginManagerService.simpleLogin(dto);
    const token = this.authService.getJwtToken({
      id: acount.idAccount,
      email: acount.email,
    });
    return { token: token };
  }

  async verifyAccount(token: string) {
    const account = await this.registerManagerService.verifyAccount(token);
    const jwt = this.authService.getJwtToken({
      id: account.idAccount,
      email: account.email,
    });
    return { token: jwt };
  }
}
