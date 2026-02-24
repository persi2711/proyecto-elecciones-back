import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SimpleLoginDto } from '../../contracts/auth/login-contracts/simple-login.dto';

import { SimpleRegisterDto } from '../../contracts/auth/register-contracts/simple-register.dto';
import { SimpleAuthBroker } from 'src/modules/application/brokers/auth/simple-auth-broker.service';

@ApiTags('Simple-auth')
@Controller('simple-auth')
export class SimpleAuthController {
  constructor(private simpleAuthBroker: SimpleAuthBroker) {}

  @Post('login')
  @ApiOperation({ summary: 'Inicio de sesión con email y contraseña' })
  @ApiResponse({ status: 200, description: 'Login exitoso' })
  @ApiResponse({ status: 401, description: 'Credenciales inválidas' })
  simpleLogin(@Body() dto: SimpleLoginDto) {
    return this.simpleAuthBroker.simpleLogin(dto);
  }

  @Post('register')
  @ApiOperation({ summary: 'Registro de usuario con email y contraseña' })
  @ApiResponse({
    status: 201,
    description: 'Registro exitoso. Requiere verificación de email.',
  })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  simpleRegister(@Body() dto: SimpleRegisterDto) {
    return this.simpleAuthBroker.simpleRegister(dto);
  }
  @Get('verify')
  @ApiOperation({ summary: 'Verificar cuenta por token' })
  @ApiResponse({ status: 200, description: 'Cuenta verificada correctamente' })
  async verify(@Query('token') token: string) {
    return this.simpleAuthBroker.verifyAccount(token);
  }
}
