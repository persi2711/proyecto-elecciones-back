import { Module } from '@nestjs/common';

import { CoreModule } from '../core/core.module';
import { AuthModule } from '../infrastructure/extensions/auth/auth.module';
import { SimpleAuthBroker } from './brokers/auth/simple-auth-broker.service';
import { EmailModule } from '../infrastructure/extensions/emails/email.module';

@Module({
  imports: [CoreModule, AuthModule, EmailModule],
  providers: [SimpleAuthBroker],
  exports: [SimpleAuthBroker],
})
export class AplicationModule {}
