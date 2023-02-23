import {
  AddAccount,
  Hasher,
  AddAccountRepository,
  CheckAccountByEmailRepository,
} from "./db-add-account.protocols";
export class DbAddAccount implements AddAccount {
  constructor(
    private readonly _hasher: Hasher,
    private readonly _addAccountRepository: AddAccountRepository,
    private readonly _checkAccountByEmailRepository: CheckAccountByEmailRepository
  ) {}

  async add(accountData: AddAccount.Params): Promise<AddAccount.Result> {
    const exists = await this._checkAccountByEmailRepository.checkByEmail(
      accountData.email
    );
    let isValid = false;
    if (!exists) {
      const hashed = await this._hasher.hash(accountData.password);
      isValid = await this._addAccountRepository.add({
        ...accountData,
        password: hashed,
      });
    }

    return isValid;
  }
}
