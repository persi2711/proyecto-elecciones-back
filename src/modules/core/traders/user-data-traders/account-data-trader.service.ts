import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { DataSource, EntityManager, Repository } from 'typeorm';
import {
  AccountRegisterDto,
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
  async createAccount(
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

  async simpleLogin(dto: SimpleLoginDto): Promise<Account> {
    const normalizedEmail = dto.email.toLowerCase().trim();

    const account = await this.accountRepository
      .createQueryBuilder('account')
      .addSelect('account.password')
      .where('account.email = :email', { email: normalizedEmail })
      .getOne();

    if (!account) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    if (!account.emailVerified) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const passwordMatch = await bcrypt.compare(dto.password, account.password);

    if (!passwordMatch) {
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
}
