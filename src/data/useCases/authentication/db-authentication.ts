import { 
    Authentication,
    LoadAccountByEmailRepository, 
    AuthenticationModel, 
    HashComparer, 
    TokenGenerator, 
    UpdateAccessTokenRepository 
} from "./db-authentication-protocols"

export class DbAuthentication implements Authentication {
    private readonly _loadAccountByEmailRepository: LoadAccountByEmailRepository
    private readonly _hashComparer: HashComparer
    private readonly _tokenGenerator: TokenGenerator
    private readonly _updateAccessTokenRepository: UpdateAccessTokenRepository
    
    constructor (
        loadAccountByEmailRepository: LoadAccountByEmailRepository, 
        hashComparer: HashComparer,
        tokenGenerator: TokenGenerator,
        updateAccessTokenRepository: UpdateAccessTokenRepository
    ) {
        this._loadAccountByEmailRepository = loadAccountByEmailRepository
        this._hashComparer = hashComparer
        this._tokenGenerator = tokenGenerator
        this._updateAccessTokenRepository = updateAccessTokenRepository
    }
    
    async auth(authentication: AuthenticationModel): Promise<string> {
        const account = await this._loadAccountByEmailRepository.load(authentication.email)
        if (account) {
            const isValid = await this._hashComparer.compare(authentication.password, account.password)
            if (isValid) {
                const accessToken = await this._tokenGenerator.generate(account.id)
                await this._updateAccessTokenRepository.update(account.id, accessToken)
                return accessToken
            }
        }
        return null
    }
}