import { Module } from '@nestjs/common';

import { AplicationModule } from '../application/application.module';
import { SimpleAuthController } from './controllers/auth/simple-auth.controller';
import { UpdateUserInformationController } from './controllers/user/update-user-information.controller';
import { PassportModule } from '@nestjs/passport';
import { SesionAuthModule } from '../infrastructure/extensions/auth/sesison-auth/sesion-auth.module';
import { ResourcesAuthController } from './controllers/auth/resources-auth.controller';
import { GoogleAuthController } from './controllers/auth/google-auth.controller';

@Module({
  imports: [AplicationModule, SesionAuthModule],
  controllers: [
    SimpleAuthController,
    UpdateUserInformationController,
    ResourcesAuthController,
    GoogleAuthController,
  ],
  providers: [],
})
export class ApiModule {}
