import { AddAccount, AddAccountParams } from "@/domain/useCases/addAccount";
import {
  Authentication,
  AuthenticationParams,
} from "@/domain/useCases/authentication";
import { LoadAccountByToken } from "@/domain/useCases/load-account-by-token";
import { AccountModel } from "@/domain/models/account";
import { mockAccountModel } from "@/domain/test";

export const mockAddAccount = (): AddAccount => {
  class AddAccountStub implements AddAccount {
    async add(account: AddAccountParams): Promise<AccountModel> {
      return new Promise((resolve) => resolve(mockAccountModel()));
    }
  }
  return new AddAccountStub();
};

export const mockAuthentication = (): Authentication => {
  class AuthenticationStub implements Authentication {
    async auth(authentication: AuthenticationParams): Promise<string> {
      return new Promise((resolve) => resolve("any_token"));
    }
  }
  return new AuthenticationStub();
};

export const mockLoadAccountByToken = (): LoadAccountByToken => {
  class LoadAccountByTokenStub implements LoadAccountByToken {
    load(
      accessToken: string,
      role?: string | undefined
    ): Promise<AccountModel> {
      return Promise.resolve(mockAccountModel());
    }
  }
  return new LoadAccountByTokenStub();
};
