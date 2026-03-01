import { ForbiddenException, Injectable } from '@nestjs/common';
import { ProfileImageUpdateDto } from 'src/modules/api/contracts/user-update/profile-image-update.dto';
import { EntityManager } from 'typeorm';
import {
  Resource,
  ResourceType,
  StorageProvider,
} from '../../objects/application-data-module/resources/resource.entity';

@Injectable()
export class ResourceDataTrader {
  constructor() {}
  async createResourceImage(
    dto: ProfileImageUpdateDto,
    idUser: string,
    manager: EntityManager,
  ) {
    let oldPublicId: string | null = null;
    if (!dto.publicId.startsWith(`users/${idUser}`)) {
      throw new ForbiddenException('PublicId inválido');
    }

    const existingAvatar = await manager.findOne(Resource, {
      where: {
        idUser,
        typeResource: ResourceType.IMAGE,
      },
    });

    if (existingAvatar) {
      oldPublicId = existingAvatar.key;

      await manager.delete(Resource, {
        idResource: existingAvatar.idResource,
      });
    }

    const newResource = manager.create(Resource, {
      typeResource: ResourceType.IMAGE,
      provider: StorageProvider.PROVIDER_A,
      key: dto.publicId,
      root: dto.secureUrl,
      metadata: dto.metadata ?? null,
      idUser,
    });

    await manager.save(newResource);

    return { newResource: newResource, oldPublicId: oldPublicId };
  }
}
