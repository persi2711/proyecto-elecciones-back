import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { User } from '../../objects/user-data-module/users/users.entity';
import { UserRegisterDto } from 'src/modules/api/contracts/auth/register-contracts/simple-register.dto';

@Injectable()
export class UserDataTrader {
  constructor() {}
  async createUser(
    dto: UserRegisterDto,
    idAccount: string,
    manager: EntityManager,
  ): Promise<User> {
    const user = manager.create(User, {
      telefono: dto.telefono,
      sector: dto.sector,
      state: dto.state,
      idAccount: idAccount,
    });

    return manager.save(user);
  }
}
