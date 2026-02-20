import { Account } from './account.entity';

export class AccountVO {
  account: Account;
  errors: string[];
  constructor(account: Account) {
    this.account = account;
    this.runValidations();
  }

  private runValidations() {
    const account = this.account;
  }
}
