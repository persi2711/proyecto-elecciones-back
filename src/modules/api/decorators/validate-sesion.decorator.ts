import {
  createParamDecorator,
  ExecutionContext,
  InternalServerErrorException,
} from '@nestjs/common';

export const ValidateSesion = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    const expirationInSeconds = req.authInfo?.exp || req.user?.exp;

    if (!expirationInSeconds) {
      throw new InternalServerErrorException(
        'No se pudo determinar la expiración del token',
      );
    }

    const account = req.user.Account;

    if (!account) {
      throw new InternalServerErrorException(
        'Account not found in request (AuthGuard missing?)',
      );
    }

    const user = account.users?.[0];

    if (!user) {
      throw new InternalServerErrorException(
        'User profile not found for this account',
      );
    }

    const { users, ...accountData } = account;
    user.account = accountData;

    // 4. Retornamos el objeto user completo o una propiedad específica
    return {
      user: user,
      expiresAt: new Date(expirationInSeconds * 1000).toISOString(),
    };
  },
);
