import { Controller } from '@nestjs/common';
import { RegisterBroker } from 'src/modules/application/brokers/auth/register-broker.service';

@Controller()
export class RegisterController {
  constructor(registerBroker: RegisterBroker) {}
}
