import { Controller } from '@nestjs/common';
import { LoginSesionBroker } from 'src/modules/application/brokers/auth/login-sesion-broker.service';

@Controller()
export class LoginSesionController {
  constructor(loginSesionBroker: LoginSesionBroker) {}
}
