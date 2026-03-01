import { EmailVerificationTokenDataTrader } from './../../traders/application-data-traders/email-verification-token-data-trader.service';
import { Injectable } from '@nestjs/common';
import {
  GoogleAccountRegisterDto,
  GoogleCreateAccountDto,
  SimpleRegisterDto,
} from 'src/modules/api/contracts/auth/register-contracts/simple-register.dto';
import { DataSource } from 'typeorm';
import { AccountDataTrader } from '../../traders/user-data-traders/account-data-trader.service';
import { UserDataTrader } from '../../traders/user-data-traders/user-data-tarder.service';
import { GeneralInfoDataTrader } from '../../traders/user-data-traders/general-info-data-trader.service';
import { createHash } from 'crypto';
import e from 'express';

@Injectable()
export class RegisterManagerService {
  constructor(
    private dataSource: DataSource,
    private accountDataTrader: AccountDataTrader,
    private userDataTrader: UserDataTrader,
    private generalInfoDataTrader: GeneralInfoDataTrader,
    private emailVerificationTokenDataTrader: EmailVerificationTokenDataTrader,
  ) {}

  async createAccountSimple(simpleRegisterDto: SimpleRegisterDto) {
    return this.dataSource.transaction(async (manager) => {
      const { account, user, generalInfo } = simpleRegisterDto;

      const createdAccount = await this.accountDataTrader.createAccountSimple(
        account,
        manager,
      );

      const createdUser = await this.userDataTrader.createUser(
        user,
        createdAccount.idAccount,
        manager,
      );

      const createdGeneralInfo =
        await this.generalInfoDataTrader.createGeneralInfo(
          generalInfo,
          createdUser.idUser,
          manager,
        );

      return {
        email: createdAccount.email,
      };
    });
  }
  async createAccountGoogle(simpleRegisterDto: GoogleCreateAccountDto) {
    return this.dataSource.transaction(async (manager) => {
      const { account, user, generalInfo } = simpleRegisterDto;

      const createdAccount = await this.accountDataTrader.createAccountGoogle(
        account,
        manager,
      );

      const createdUser = await this.userDataTrader.createUser(
        user,
        createdAccount.idAccount,
        manager,
      );

      const createdGeneralInfo =
        await this.generalInfoDataTrader.createGeneralInfo(
          generalInfo,
          createdUser.idUser,
          manager,
        );

      return createdAccount;
    });
  }
  async verifyAccount(token: string) {
    const idAcount =
      await this.emailVerificationTokenDataTrader.validateAccount(token);
    const account = await this.accountDataTrader.activateAccount(idAcount);
    return account;
  }

  async validateEmail(email: string) {
    return await this.accountDataTrader.validateEmail(email);
  }
  async validateGoogleEmail(email: string) {
    return await this.accountDataTrader.vaildateGoogleEmail(email);
  }

  async getEmailToken(email: string) {
    const account = await this.accountDataTrader.findOneByEmail(email);

    if (!account) {
      return {
        token: null,
        cooldownUntil: null,
      };
    }

    const now = new Date();

    // 1️⃣ Verificar si el cooldown está activo
    if (account.emailCooldownUntil && account.emailCooldownUntil > now) {
      return {
        token: null,
        cooldownUntil: account.emailCooldownUntil,
      };
    }

    // 2️⃣ Crear token
    const rawToken = await this.emailVerificationTokenDataTrader.createToken(
      account.idAccount,
    );

    // 3️⃣ Definir nueva fecha de cooldown
    const cooldownMinutes = 2;
    const newCooldownUntil = new Date(Date.now() + cooldownMinutes * 60 * 1000);

    await this.accountDataTrader.updateEmailCooldown(
      account.idAccount,
      newCooldownUntil,
    );

    return {
      token: rawToken,
      cooldownUntil: newCooldownUntil,
    };
  }
}
