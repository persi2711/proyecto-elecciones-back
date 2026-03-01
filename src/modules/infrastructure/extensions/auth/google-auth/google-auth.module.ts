import { Module } from '@nestjs/common';
import { GoogleAuthService } from './google-auth.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],

  providers: [GoogleAuthService],
  exports: [GoogleAuthService],
})
export class GoogleAuthModule {}
