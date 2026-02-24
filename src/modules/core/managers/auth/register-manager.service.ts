import { EmailVerificationTokenDataTrader } from './../../traders/application-data-traders/email-verification-token-data-trader.service';
import { Injectable } from '@nestjs/common';
import { SimpleRegisterDto } from 'src/modules/api/contracts/auth/register-contracts/simple-register.dto';
import { DataSource } from 'typeorm';
import { AccountDataTrader } from '../../traders/user-data-traders/account-data-trader.service';
import { UserDataTrader } from '../../traders/user-data-traders/user-data-tarder.service';
import { GeneralInfoDataTrader } from '../../traders/user-data-traders/general-info-data-trader.service';
import { createHash } from 'crypto';

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

      const createdAccount = await this.accountDataTrader.createAccount(
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
      const { rawToken } =
        await this.emailVerificationTokenDataTrader.createToken(
          createdAccount.idAccount,
          manager,
        );
      return {
        email: createdAccount.email,
        rawToken,
      };
    });
  }
  async verifyAccount(token: string) {
    const idAcount =
      await this.emailVerificationTokenDataTrader.validateAccount(token);
    const account = await this.accountDataTrader.activateAccount(idAcount);
    return account;
  }
}
