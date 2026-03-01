import { Injectable } from '@nestjs/common';
import { ProfileImageUpdateDto } from 'src/modules/api/contracts/user-update/profile-image-update.dto';
import { DataSource } from 'typeorm';
import { ResourceDataTrader } from '../../traders/application-data-traders/resource-data-trader.service';

@Injectable()
export class UpdateUserManagerService {
  constructor(
    private dataSource: DataSource,
    private resourceDataTrader: ResourceDataTrader,
  ) {}
  async updateProfileImage(dto: ProfileImageUpdateDto, idUser: string) {
    const result = await this.dataSource.transaction(async (manager) => {
      const resources = await this.resourceDataTrader.createResourceImage(
        dto,
        idUser,
        manager,
      );
      return resources;
    });
    return result;
  }
}
