import { LoadAccountByToken } from "../../../domain/useCases/load-account-by-token";
import { Decrypter } from "../../protocols/criptography/decrypter";
import { AccountModel } from "../add-account/db-add-account.protocols";

export class DbLoadAccountByToken implements LoadAccountByToken {
    constructor(private readonly _decrypter: Decrypter) {}
    
    async load(accessToken: string, role?: string): Promise<AccountModel> {
        await this._decrypter.decrypt(accessToken)
        return null
    }
}