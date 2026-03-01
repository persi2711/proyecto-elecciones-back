import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Resend } from 'resend';

@Injectable()
export class EmailService {
  private resend: Resend;
  private emailFrom: string;
  private frontendUrl: string;

  constructor(private readonly configService: ConfigService) {
    const apiKey = this.configService.get<string>('RESEND_KEY');

    if (!apiKey) {
      throw new Error('RESEND_KEY no está definido');
    }

    this.emailFrom = this.configService.get<string>('EMAIL_FROM') ?? '';

    this.frontendUrl = this.configService.get<string>('FRONTEND_URL') ?? '';

    this.resend = new Resend(apiKey);
  }

  async sendVerificationEmail(email: string, token: string) {
    const verificationUrl = `${this.frontendUrl}auth/full/verify/${token}`;

    await this.resend.emails.send({
      from: this.emailFrom,
      to: email,
      subject: 'Verifica tu cuenta',
      html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px;">
        <h2 style="color: #1a202c; text-align: center;">¡Bienvenido al Consejo Ciudadano de Baja California!</h2>
        <p style="color: #4a5568; line-height: 1.6; text-align: center;">
          Gracias por registrarte. Para completar tu perfil y activar tu cuenta, por favor confirma tu correo electrónico.
        </p>
        
        <div style="text-align: center; margin: 32px 0;">
          <a href="${verificationUrl}" 
             style="background-color: #007bff; color: white; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-weight: bold; display: inline-block;">
            Confirmar Correo Electrónico
          </a>
        </div>

        <p style="color: #718096; font-size: 14px; text-align: center;">
          Este enlace expirará en <b>15 minutos</b>.<br>
          Si no creaste esta cuenta, puedes ignorar este mensaje.
        </p>
        
        <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 32px 0;">
        
        <p style="color: #a0aec0; font-size: 12px; text-align: center;">
          Si tienes problemas con el botón, copia y pega este enlace en tu navegador:<br>
          <a href="${verificationUrl}" style="color: #007bff;">${verificationUrl}</a>
        </p>
      </div>
    `,
    });
  }
}
