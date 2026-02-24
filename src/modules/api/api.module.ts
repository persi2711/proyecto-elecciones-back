import { Module } from '@nestjs/common';

import { AplicationModule } from '../application/application.module';
import { SimpleAuthController } from './controllers/auth/simple-auth.controller';

@Module({
  imports: [AplicationModule],
  controllers: [SimpleAuthController],
  providers: [],
})
export class ApiModule {}
