import { BadRequestException, Injectable } from '@nestjs/common';
import { EntityManager, Repository } from 'typeorm';
import { EmailVerificationToken } from '../../objects/application-data-module/auth/email-verification-tokens';
import * as bcrypt from 'bcrypt';
import { createHash, randomBytes } from 'crypto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class EmailVerificationTokenDataTrader {
  constructor(
    @InjectRepository(EmailVerificationToken)
    private emailVerificationRepository: Repository<EmailVerificationToken>,
  ) {}
  async createToken(idAccount: string): Promise<string> {
    await this.emailVerificationRepository.delete({
      idAccount,
    });

    const rawToken = randomBytes(32).toString('hex');

    const tokenHash = createHash('sha256').update(rawToken).digest('hex');

    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + 15);

    const tokenEntity = this.emailVerificationRepository.create({
      idAccount,
      tokenHash,
      expiresAt,
    });

    await this.emailVerificationRepository.save(tokenEntity);

    return rawToken;
  }

  async validateAccount(token: string) {
    const tokenHash = createHash('sha256').update(token).digest('hex');

    const validToken = await this.emailVerificationRepository.findOne({
      where: { tokenHash },
      relations: ['account'],
    });

    if (!validToken) {
      throw new BadRequestException('Token inválido');
    }

    if (validToken.expiresAt < new Date()) {
      throw new BadRequestException('Token expirado');
    }
    const account = validToken?.account;
    if (!account) {
      throw new BadRequestException('Token no asociado a una cuenta');
    }
    await this.emailVerificationRepository.delete({
      idAccount: account.idAccount,
    });

    return account.idAccount;
  }
}
