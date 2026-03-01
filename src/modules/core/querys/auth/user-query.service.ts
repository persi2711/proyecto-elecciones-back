import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from '../../objects/user-data-module/accounts/account.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserQueryService {
  constructor(
    @InjectRepository(Account)
    private readonly userRepository: Repository<Account>,
  ) {}

  async findActiveById(id: string): Promise<Account | null> {
    return this.userRepository.findOne({
      where: { idAccount: id, isActive: true },
      relations: ['users'],
    });
  }
}
