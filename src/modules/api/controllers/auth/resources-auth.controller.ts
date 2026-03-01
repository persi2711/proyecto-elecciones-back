import { Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ResourcesAuthBroker } from 'src/modules/application/brokers/auth/resources-auth-broker.service';
import { GetUser } from '../../decorators/get-user.decorator';
import { User } from 'src/modules/core/objects/user-data-module/users/users.entity';
@ApiBearerAuth()
@ApiTags('Resources-auth')
@Controller('resources-auth')
export class ResourcesAuthController {
  constructor(private resourcesAuthBroker: ResourcesAuthBroker) {}
  @UseGuards(AuthGuard())
  @Post('cloudinary-signature')
  @ApiOperation({ summary: 'Generar firma para subida a Cloudinary' })
  @ApiResponse({ status: 201, description: 'Firma generada correctamente' })
  getCloudinarySignature(@GetUser() user: User) {
    return this.resourcesAuthBroker.generateSignature(user);
  }
}
