import { Injectable } from '@nestjs/common';
import { ProfileImageUpdateDto } from 'src/modules/api/contracts/user-update/profile-image-update.dto';
import { UpdateUserManagerService } from 'src/modules/core/managers/user/update-user-manager.service';
import { User } from 'src/modules/core/objects/user-data-module/users/users.entity';
import { ImageResourceService } from 'src/modules/infrastructure/extensions/resources/image-resources/image-resource.service';

@Injectable()
export class UpdateUserBrokerService {
  constructor(
    private updateUserManagerService: UpdateUserManagerService,
    private imageResourceService: ImageResourceService,
  ) {}
  async updateProfileImage(acount: User, dto: ProfileImageUpdateDto) {
    const resources = await this.updateUserManagerService.updateProfileImage(
      dto,
      acount.idUser,
    );
    if (resources.oldPublicId) {
      await this.imageResourceService.deleteImage(resources.oldPublicId);
    }
    return resources.newResource;
  }

  updateCorriculumDocument() {}
}
