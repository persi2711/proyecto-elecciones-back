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
    const verificationUrl = `${this.frontendUrl}/auth/verify?token=${token}`;

    await this.resend.emails.send({
      from: this.emailFrom,
      to: email,
      subject: 'Verifica tu cuenta',
      html: `
        <h2>Verifica tu cuenta</h2>
        <p>Haz clic en el siguiente enlace:</p>
        <a href="${verificationUrl}">
          Verificar cuenta
        </a>
        <p>Este enlace expira en 15 minutos.</p>
      `,
    });
  }
}
