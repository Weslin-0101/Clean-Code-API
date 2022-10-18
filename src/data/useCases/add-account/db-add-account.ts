import { AccountModel, AddAccount, AddAccountModel, Hasher, AddAccountRepository, LoadAccountByEmailRepository } from './db-add-account.protocols';
export class DbAddAccount implements AddAccount {
    
    constructor(
        private readonly _hasher: Hasher, 
        private readonly _addAccountRepository: AddAccountRepository,
        private readonly _loadAccountByEmailRepository: LoadAccountByEmailRepository
    ) {}
    
    async add(accountData: AddAccountModel): Promise<AccountModel> {
        const account = await this._loadAccountByEmailRepository.loadByEmail(accountData.email)
        if (!account) {
            const hashed = await this._hasher.hash(accountData.password)
            return this._addAccountRepository.add(Object.assign({}, accountData, { password: hashed }))
        }
        
        return null
    }

}