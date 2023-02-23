import {
  AddAccount,
  Hasher,
  AddAccountRepository,
  LoadAccountByEmailRepository,
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
    let isValid = false;
    if (!account) {
      const hashed = await this._hasher.hash(accountData.password);
      isValid = await this._addAccountRepository.add({
        ...accountData,
        password: hashed,
      });
    }

    return isValid;
  }
}
