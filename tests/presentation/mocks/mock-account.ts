import { AddAccount } from "@/domain/useCases/addAccount";
import { Authentication } from "@/domain/useCases/authentication";
import { LoadAccountByToken } from "@/domain/useCases/load-account-by-token";
import faker from "faker";

export class AddAccountSpy implements AddAccount {
  result = true;
  addAccountParams: AddAccount.Params;

  async add(account: AddAccount.Params): Promise<AddAccount.Result> {
    this.addAccountParams = account;
    return Promise.resolve(this.result);
  }
}

export class AuthenticationSpy implements Authentication {
  authenticationParams: Authentication.Params;
  authenticationModel = {
    accessToken: faker.random.uuid(),
    name: faker.name.findName(),
  };

  async auth(
    authenticationParams: Authentication.Params
  ): Promise<Authentication.Result> {
    this.authenticationParams = authenticationParams;
    return this.authenticationModel;
  }
}

export class LoadAccountByTokenSpy implements LoadAccountByToken {
  result = {
    id: faker.random.uuid(),
  };
  accessToken: string;
  role: string;

  async load(
    accessToken: string,
    role?: string
  ): Promise<LoadAccountByToken.Result> {
    this.accessToken = accessToken;
    this.role = role;
    return Promise.resolve(this.result);
  }
}
