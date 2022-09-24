import { Authentication, AuthenticationModel } from "../../../domain/useCases/authentication";
import { HashComparer } from "../../protocols/criptography/hash-comparer";
import { LoadAccountByEmailRepository } from "../../protocols/db/load-account-email-repository";

export class DbAuthentication implements Authentication {
    private readonly _loadAccountByEmailRepository: LoadAccountByEmailRepository
    private readonly _hashComparer: HashComparer
    
    constructor (loadAccountByEmailRepository: LoadAccountByEmailRepository, hashComparer: HashComparer) {
        this._loadAccountByEmailRepository = loadAccountByEmailRepository
        this._hashComparer = hashComparer
    }
    
    async auth(authentication: AuthenticationModel): Promise<string> {
        const account = await this._loadAccountByEmailRepository.load(authentication.email)
        if (account) {
            await this._hashComparer.compare(authentication.password, account.password)
        }
        return null
    }
}