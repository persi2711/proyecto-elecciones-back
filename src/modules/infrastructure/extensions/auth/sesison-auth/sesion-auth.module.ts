import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { SesionAuthService } from './sesion-auth.service';
import { CoreModule } from 'src/modules/core/core.module';
import { JwtStrategy } from './strategis/jwt.strategy';

@Module({
  controllers: [],
  providers: [SesionAuthService, JwtStrategy],
  imports: [
    ConfigModule,
    CoreModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          secret: configService.get('JWT_SECRET'),
          signOptions: {
            expiresIn: '2h',
          },
        };
      },
    }),
  ],
  exports: [SesionAuthService, JwtStrategy, PassportModule, JwtModule],
})
export class SesionAuthModule {}
