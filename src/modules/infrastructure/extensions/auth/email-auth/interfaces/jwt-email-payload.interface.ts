export interface EmailVerificationPayload {
  email: string;
  type: 'email-verification';
  registed: boolean;
  provider: 'google' | 'application';
}
