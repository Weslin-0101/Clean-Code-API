import { AddAccount, AddAccountParams } from "@/domain/useCases/addAccount";
import {
  Authentication,
  AuthenticationParams,
} from "@/domain/useCases/authentication";
import { LoadAccountByToken } from "@/domain/useCases/load-account-by-token";
import { AccountModel } from "@/domain/models/account";
import { mockAccountModel } from "@/domain/test";
import faker from "faker";

export class AddAccountSpy implements AddAccount {
  accountModel = mockAccountModel();
  addAccountParams: AddAccountParams;

  async add(account: AddAccountParams): Promise<AccountModel> {
    this.addAccountParams = account;
    return Promise.resolve(this.accountModel);
  }
}

export class AuthenticationSpy implements Authentication {
  authenticationParams: AuthenticationParams;
  token = faker.random.uuid();

  async auth(authenticationParams: AuthenticationParams): Promise<string> {
    this.authenticationParams = authenticationParams;
    return Promise.resolve(this.token);
  }
}

export class LoadAccountByTokenSpy implements LoadAccountByToken {
  accountModel = mockAccountModel();
  accessToken: string;
  role: string;

  async load(accessToken: string, role?: string): Promise<AccountModel> {
    this.accessToken = accessToken;
    this.role = role;
    return Promise.resolve(this.accountModel);
  }
}
