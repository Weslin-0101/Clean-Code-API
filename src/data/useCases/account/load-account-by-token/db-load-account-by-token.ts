import { LoadAccountByToken, Decrypter, LoadAccountByTokenRepository, AccountModel } from "./db-load-account-by-token-protocols";

export class DbLoadAccountByToken implements LoadAccountByToken {
    constructor(
        private readonly _decrypter: Decrypter,
        private readonly _loadAccountByTokenRepository: LoadAccountByTokenRepository) {}
    
    async load(accessToken: string, role?: string): Promise<AccountModel> {
        const token = await this._decrypter.decrypt(accessToken)
        if (token) {
            const account = await this._loadAccountByTokenRepository.loadByToken(accessToken, role)
            if (account) return account
        }
        return null
    }
}