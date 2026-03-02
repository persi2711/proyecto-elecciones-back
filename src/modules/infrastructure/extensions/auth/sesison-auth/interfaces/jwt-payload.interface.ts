export interface JwtPayload {
  id: string;
  type: 'Sesion';
  exp?: number;
  iat?: number;
}
