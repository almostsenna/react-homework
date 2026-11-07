export interface Credentials {
  login: string;
  password: string;
}

export type CredentialField = keyof Credentials;
export type CredentialErrors = Partial<Record<CredentialField, string>>;
