import { Module } from '@nestjs/common';

import { CoreModule } from '../core/core.module';
import { SesionAuthModule } from '../infrastructure/extensions/auth/sesison-auth/sesion-auth.module';
import { SimpleAuthBroker } from './brokers/auth/simple-auth-broker.service';
import { EmailModule } from '../infrastructure/extensions/emails/email.module';
import { UpdateUserBrokerService } from './brokers/user/update-user-broker.service';
import { ResourcesAuthBroker } from './brokers/auth/resources-auth-broker.service';
import { ImageResourceModule } from '../infrastructure/extensions/resources/image-resources/image-resource.module';
import { EmailAuthModule } from '../infrastructure/extensions/auth/email-auth/email-auth.module';
import { GoogleAuthModule } from '../infrastructure/extensions/auth/google-auth/google-auth.module';
import { GoogleAutBroker } from './brokers/auth/google-auth-broker.service';

@Module({
  imports: [
    CoreModule,
    SesionAuthModule,
    EmailModule,
    ImageResourceModule,
    EmailAuthModule,
    GoogleAuthModule,
  ],
  providers: [
    SimpleAuthBroker,
    UpdateUserBrokerService,
    ResourcesAuthBroker,
    GoogleAutBroker,
  ],
  exports: [
    SimpleAuthBroker,
    UpdateUserBrokerService,
    ResourcesAuthBroker,
    GoogleAutBroker,
  ],
})
export class AplicationModule {}
