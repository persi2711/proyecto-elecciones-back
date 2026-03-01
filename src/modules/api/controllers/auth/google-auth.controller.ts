import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GoogleAutBroker } from 'src/modules/application/brokers/auth/google-auth-broker.service';
import {
  GoogleAccountRegisterDto,
  GoogleCreateAccountDto,
} from '../../contracts/auth/register-contracts/simple-register.dto';

@ApiTags('Google-auth')
@Controller('auth')
export class GoogleAuthController {
  constructor(private gogleAutBroker: GoogleAutBroker) {}
  @Post('google')
  async googleLogin(@Body('token') token: string) {
    return await this.gogleAutBroker.verifyGoogleToken(token);
  }
  @Post('register-google')
  async registerGoogleAccount(@Body() dto: GoogleCreateAccountDto) {
    return this.gogleAutBroker.createGoogleAcoutn(dto);
  }
}
