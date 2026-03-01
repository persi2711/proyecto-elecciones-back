import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OAuth2Client } from 'google-auth-library';

@Injectable()
export class GoogleAuthService {
  private client: OAuth2Client;

  constructor(private configService: ConfigService) {
    // 👈 Obtenemos el ID desde el ConfigService
    const clientId = this.configService.get<string>('GOOGLE_CLIENT_ID');

    if (!clientId) {
      throw new Error('GOOGLE_CLIENT_ID no está definido en la configuración');
    }

    this.client = new OAuth2Client(clientId);
  }

  async verifyGoogleToken(token: string) {
    try {
      const ticket = await this.client.verifyIdToken({
        idToken: token,
        // 👈 También lo usamos aquí para validar la audiencia
        audience: this.configService.get<string>('GOOGLE_CLIENT_ID'),
      });

      const payload = ticket.getPayload();

      if (!payload) {
        throw new UnauthorizedException('Token inválido');
      }

      // Continuar con la lógica de base de datos...
      return this.handleUserPayload(payload);
    } catch (error) {
      throw new UnauthorizedException('Error al verificar con Google');
    }
  }

  private async handleUserPayload(payload: any) {
    // Tu lógica para buscar/crear usuario
    return {
      email: payload.email,
      name: payload.name,
      picture: payload.picture,
    };
  }
}
