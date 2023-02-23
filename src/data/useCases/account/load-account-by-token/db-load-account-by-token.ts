import {
  LoadAccountByToken,
  Decrypter,
  LoadAccountByTokenRepository,
} from "./db-load-account-by-token-protocols";

export class DbLoadAccountByToken implements LoadAccountByToken {
  constructor(
    private readonly _decrypter: Decrypter,
    private readonly _loadAccountByTokenRepository: LoadAccountByTokenRepository
  ) {}

  async load(
    accessToken: string,
    role?: string
  ): Promise<LoadAccountByToken.Result> {
    let token: string;
    try {
      token = await this._decrypter.decrypt(accessToken);
    } catch (error) {
      return null;
    }

    if (token) {
      const account = await this._loadAccountByTokenRepository.loadByToken(
        accessToken,
        role
      );
      if (account) return account;
    }
    return null;
  }
}
