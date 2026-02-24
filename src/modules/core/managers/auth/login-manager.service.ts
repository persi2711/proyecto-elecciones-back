import { DataSource } from 'typeorm';
import { AccountDataTrader } from '../../traders/user-data-traders/account-data-trader.service';
import { SimpleLoginDto } from 'src/modules/api/contracts/auth/login-contracts/simple-login.dto';
import { Account } from '../../objects/user-data-module/accounts/account.entity';
import { Injectable } from '@nestjs/common';
@Injectable()
export class LoginManagerService {
  constructor(private accountDataTrader: AccountDataTrader) {}

  async simpleLogin(simpleLoginDto: SimpleLoginDto): Promise<Account> {
    return await this.accountDataTrader.simpleLogin(simpleLoginDto);
  }
}
