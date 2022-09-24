import { Authentication, AuthenticationModel } from "../../../domain/useCases/authentication";
import { LoadAccountByEmailRepository } from "../../protocols/load-account-email-repository";

export class DbAuthentication implements Authentication {
    private readonly _loadAccountByEmailRepository: LoadAccountByEmailRepository
    
    constructor (loadAccountByEmailRepository: LoadAccountByEmailRepository) {
        this._loadAccountByEmailRepository = loadAccountByEmailRepository
    }
    
    async auth(authentication: AuthenticationModel): Promise<string> {
        await this._loadAccountByEmailRepository.load(authentication.email)
        return null
    }
}