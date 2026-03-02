import { BadRequestException, Injectable } from '@nestjs/common';
import { SimpleLoginDto } from 'src/modules/api/contracts/auth/login-contracts/simple-login.dto';
import { SimpleRegisterDto } from 'src/modules/api/contracts/auth/register-contracts/simple-register.dto';
import { LoginManagerService } from 'src/modules/core/managers/auth/login-manager.service';
import { RegisterManagerService } from 'src/modules/core/managers/auth/register-manager.service';
import { EmailAuthService } from 'src/modules/infrastructure/extensions/auth/email-auth/email-auth.service';
import { SesionAuthService } from 'src/modules/infrastructure/extensions/auth/sesison-auth/sesion-auth.service';
import { EmailService } from 'src/modules/infrastructure/extensions/emails/email.service';

@Injectable()
export class SimpleAuthBroker {
  constructor(
    private loginManagerService: LoginManagerService,
    private authService: SesionAuthService,
    private emailAuthService: EmailAuthService,
    private registerManagerService: RegisterManagerService,
    private emailService: EmailService,
  ) {}

  async simpleRegister(dto: SimpleRegisterDto) {
    const result = await this.registerManagerService.createAccountSimple(dto);

    const token = this.emailAuthService.generate(
      result.email,
      true,
      'application',
    );
    return { token: token };
  }

  async simpleLogin(dto: SimpleLoginDto) {
    const account = await this.loginManagerService.simpleLogin(dto);

    if (!account.emailVerified) {
      const tokenValidation = this.emailAuthService.generate(
        dto.email,
        true,
        'application',
      );
      return { token: tokenValidation, verified: false };
    }
    const token = this.authService.getJwtToken({
      id: account.idAccount,
      type: 'Sesion',
    });
    return { token: token, verified: true };
  }

  async verifyAccount(dto: { token: string }) {
    const account = await this.registerManagerService.verifyAccount(dto.token);
    const jwt = this.authService.getJwtToken({
      id: account.idAccount,
      type: 'Sesion',
    });
    return { token: jwt };
  }

  async validateEmail(dto: { email: string }) {
    const result = await this.registerManagerService.validateEmail(dto.email);

    const token = this.emailAuthService.generate(
      dto.email,
      result,
      'application',
    );
    return { token: token };
  }
  async validateToken(dto: { token: string }) {
    const result = this.emailAuthService.verify(dto.token);
    return {
      email: result.email,
      registed: result.registed,
      provider: result.provider,
    };
  }

  async sendConfirmEmail(dto: { token: string }) {
    const result = this.emailAuthService.verify(dto.token);
    if (!result.registed) {
      throw new BadRequestException('no se termino el registro');
    }

    const avalibleToken = await this.registerManagerService.getEmailToken(
      result.email,
    );
    if (!avalibleToken.token) {
      return { emailSend: false, cooldown: avalibleToken.cooldownUntil };
    }
    await this.emailService.sendVerificationEmail(
      result.email,
      avalibleToken.token,
    );

    return { emailSend: true, cooldown: avalibleToken.cooldownUntil };
  }
}
