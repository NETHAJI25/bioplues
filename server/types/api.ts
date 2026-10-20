export interface ApiKey {
  id: string;
  name: string;
  prefix: string;
  scopes?: string[];
  expiresAt?: Date;
  lastUsedAt?: Date;
  createdAt: Date;
}

export interface CreateApiKeyRequest {
  name: string;
  scopes?: string[];
  expiresInDays?: number;
}
