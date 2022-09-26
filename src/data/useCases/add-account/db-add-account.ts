import { AccountModel, AddAccount, AddAccountModel, Hasher, AddAccountRepository } from './db-add-account.protocols';
export class DbAddAccount implements AddAccount {
    private readonly _hasher: Hasher;
    private readonly _addAccountRepository: AddAccountRepository;

    constructor(hasher: Hasher, addAccountRepository: AddAccountRepository) {
        this._hasher = hasher
        this._addAccountRepository = addAccountRepository
    }
    
    async add(accountData: AddAccountModel): Promise<AccountModel> {
        const hashed = await this._hasher.hash(accountData.password)
        return this._addAccountRepository.add(Object.assign({}, accountData, { password: hashed }))
    }

}