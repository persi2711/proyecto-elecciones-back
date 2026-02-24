import { Injectable } from '@nestjs/common';
import { GeneralInfoRegisterDto } from 'src/modules/api/contracts/auth/register-contracts/simple-register.dto';
import { EntityManager } from 'typeorm';
import { GeneralInfo } from '../../objects/user-data-module/general-Infos/general-info.entity';

@Injectable()
export class GeneralInfoDataTrader {
  constructor() {}
  async createGeneralInfo(
    dto: GeneralInfoRegisterDto,
    userId: string,
    manager: EntityManager,
  ): Promise<GeneralInfo> {
    const generalInfo = manager.create(GeneralInfo, {
      nombre: dto.nombre,
      apellidoP: dto.apellidoP,
      apellidoM: dto.apellidoM,
      genero: dto.genero,
      idUser: userId,
    });

    return manager.save(generalInfo);
  }
}
