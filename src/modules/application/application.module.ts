import { Module } from '@nestjs/common';
import { RegisterBroker } from './brokers/auth/register-broker.service';
import { LoginSesionBroker } from './brokers/auth/login-sesion-broker.service';
import { AccountActionsService } from './actions/account/accout-actions.service';
import { AuthActionsService } from './actions/auth/auth-actions.service';
import { CoreModule } from '../core/core.module';

@Module({
  imports: [CoreModule],
  providers: [
    RegisterBroker,
    LoginSesionBroker,
    AccountActionsService,
    AuthActionsService,
  ],
  exports: [RegisterBroker, LoginSesionBroker],
})
export class AplicationModule {}
