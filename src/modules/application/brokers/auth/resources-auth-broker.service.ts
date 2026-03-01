import { Injectable } from '@nestjs/common';
import { User } from 'src/modules/core/objects/user-data-module/users/users.entity';
import { ImageResourceService } from 'src/modules/infrastructure/extensions/resources/image-resources/image-resource.service';

@Injectable()
export class ResourcesAuthBroker {
  constructor(private imageResourceService: ImageResourceService) {}

  generateSignature(user: User) {
    const idAcount = user.idAccount;
    return this.imageResourceService.generateSignature(idAcount);
  }
}
