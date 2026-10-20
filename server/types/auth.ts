import type { Role } from './common.ts';

export interface AuthUser {
  id: string;
  email: string;
  username: string;
  role: Role;
  orgId?: string | null;
  mfaEnabled: boolean;
}

export interface LoginRequest {
  email: string;
  password: string;
  mfaCode?: string;
}

export interface RegisterRequest {
  email: string;
  username: string;
  password: string;
  firstName?: string;
  lastName?: string;
  orgName?: string;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface JwtPayload {
  userId: string;
  email: string;
  role: Role;
  orgId?: string;
  iat: number;
  exp: number;
}
