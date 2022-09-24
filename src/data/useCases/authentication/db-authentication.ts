import { Authentication, AuthenticationModel } from "../../../domain/useCases/authentication";
import { HashComparer } from "../../protocols/criptography/hash-comparer";
import { TokenGenerator } from "../../protocols/criptography/token-generator";
import { LoadAccountByEmailRepository } from "../../protocols/db/load-account-email-repository";

export class DbAuthentication implements Authentication {
    private readonly _loadAccountByEmailRepository: LoadAccountByEmailRepository
    private readonly _hashComparer: HashComparer
    private readonly _tokenGenerator: TokenGenerator
    
    constructor (
        loadAccountByEmailRepository: LoadAccountByEmailRepository, 
        hashComparer: HashComparer,
        tokenGenerator: TokenGenerator
    ) {
        this._loadAccountByEmailRepository = loadAccountByEmailRepository
        this._hashComparer = hashComparer
        this._tokenGenerator = tokenGenerator
    }
    
    async auth(authentication: AuthenticationModel): Promise<string> {
        const account = await this._loadAccountByEmailRepository.load(authentication.email)
        if (account) {
            const isValid = await this._hashComparer.compare(authentication.password, account.password)
            if (isValid) {
                const accessToken = await this._tokenGenerator.generate(account.id)
                return accessToken
            }
        }
        return null
    }
}