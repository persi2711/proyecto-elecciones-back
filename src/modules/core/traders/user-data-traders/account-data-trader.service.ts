import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { DataSource, EntityManager, Repository } from 'typeorm';
import {
  AccountRegisterDto,
  GoogleAccountRegisterDto,
  SimpleRegisterDto,
  UserRegisterDto,
} from 'src/modules/api/contracts/auth/register-contracts/simple-register.dto';
import { Account } from '../../objects/user-data-module/accounts/account.entity';
import * as bcrypt from 'bcrypt';
import { SimpleLoginDto } from 'src/modules/api/contracts/auth/login-contracts/simple-login.dto';
import { InjectRepository } from '@nestjs/typeorm';
@Injectable()
export class AccountDataTrader {
  constructor(
    @InjectRepository(Account) private accountRepository: Repository<Account>,
  ) {}
  async createAccountSimple(
    dto: AccountRegisterDto,
    manager: EntityManager,
  ): Promise<Account> {
    const normalizedEmail = dto.email.toLowerCase().trim();

    const existing = await manager.findOne(Account, {
      where: { email: normalizedEmail },
    });

    if (existing) {
      throw new BadRequestException('El email ya está registrado');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const account = manager.create(Account, {
      email: normalizedEmail,
      password: hashedPassword,
      emailVerified: false,
    });

    return manager.save(account);
  }

  async createAccountGoogle(
    dto: GoogleAccountRegisterDto,
    manager: EntityManager,
  ): Promise<Account> {
    const normalizedEmail = dto.email.toLowerCase().trim();

    const existing = await manager.findOne(Account, {
      where: { email: normalizedEmail },
    });

    if (existing) {
      throw new BadRequestException('El email ya está registrado');
    }
    const account = manager.create(Account, {
      email: normalizedEmail,
      emailVerified: true,
      isGoogleAccount: true,
    });

    return manager.save(account);
  }

  async simpleLogin(dto: SimpleLoginDto): Promise<Account> {
    const start = Date.now();
    const MIN_RESPONSE_TIME = 500; // ms (ajusta según necesidad)
    const DUMMY_HASH =
      '$2b$10$CwTycUXWue0Thq9StjUM0uJ8o1XQ6oJ2V8LojRxurx8WcN6iYG3lK';

    const normalizedEmail = dto.email.toLowerCase().trim();

    const account = await this.accountRepository
      .createQueryBuilder('account')
      .addSelect('account.password')
      .where('account.email = :email', { email: normalizedEmail })
      .getOne();

    const passwordToCompare = account?.password ?? DUMMY_HASH;

    const passwordMatch = await bcrypt.compare(dto.password, passwordToCompare);

    const isValid = account && passwordMatch;

    const elapsed = Date.now() - start;

    if (elapsed < MIN_RESPONSE_TIME) {
      await new Promise((resolve) =>
        setTimeout(resolve, MIN_RESPONSE_TIME - elapsed),
      );
    }

    if (!isValid) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    return account;
  }

  async activateAccount(id: string) {
    const account = await this.accountRepository.findOne({
      where: { idAccount: id },
    });
    if (!account) {
      throw new NotFoundException('No se encontro la cuenta del token');
    }
    account.emailVerified = true;
    const savedAccount = await this.accountRepository.save(account);
    return savedAccount;
  }

  async validateEmail(email: string): Promise<boolean> {
    const user = await this.accountRepository.findOne({
      where: { email: email },
    });
    let exist = false;
    if (user) {
      if (user.emailVerified)
        throw new BadRequestException('Ya exise ese correo');

      exist = true;
    }
    return exist;
  }

  async vaildateGoogleEmail(email: string) {
    const user = await this.accountRepository.findOne({
      where: { email: email },
    });
    if (!user) {
      return { exist: false, user: null };
    }
    return { exist: true, user: user };
  }
  async findOneByEmail(email: string) {
    const account = await this.accountRepository.findOne({
      where: { email: email, isActive: true },
    });
    if (!account) {
      throw new NotFoundException('No se encontro la cuenta');
    }
    return account;
  }

  async updateEmailCooldown(
    idAccount: string,
    cooldownUntil: Date,
  ): Promise<void> {
    await this.accountRepository.update(
      { idAccount },
      { emailCooldownUntil: cooldownUntil },
    );
  }
}
