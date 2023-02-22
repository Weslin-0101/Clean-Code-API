import {
  AddAccount,
  Hasher,
  AddAccountRepository,
  LoadAccountByEmailRepository,
  AccountModel,
} from "./db-add-account.protocols";
export class DbAddAccount implements AddAccount {
  constructor(
    private readonly _hasher: Hasher,
    private readonly _addAccountRepository: AddAccountRepository,
    private readonly _loadAccountByEmailRepository: LoadAccountByEmailRepository
  ) {}

  async add(accountData: AddAccount.Params): Promise<AddAccount.Result> {
    const account = await this._loadAccountByEmailRepository.loadByEmail(
      accountData.email
    );
    let newAccount: AccountModel = null;
    if (!account) {
      const hashed = await this._hasher.hash(accountData.password);
      newAccount = await this._addAccountRepository.add({
        ...accountData,
        password: hashed,
      });
    }

    return newAccount !== null;
  }
}
