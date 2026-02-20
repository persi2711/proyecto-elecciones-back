import { Module } from '@nestjs/common';
import { RegisterController } from './controllers/auth/register.controller';
import { LoginSesionController } from './controllers/auth/login-sesion.controller';
import { AplicationModule } from '../application/application.module';

@Module({
  imports: [AplicationModule],
  controllers: [RegisterController, LoginSesionController],
  providers: [],
})
export class ApiModule {}
