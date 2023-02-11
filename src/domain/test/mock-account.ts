import { AccountModel } from "@/domain/models/account";
import { AddAccountParams } from "@/domain/useCases/addAccount";
import { AuthenticationParams } from "@/domain/useCases/authentication";

export const mockAddAccoutParams = (): AddAccountParams => ({
  name: "any_name",
  email: "any_email@email.com",
  password: "any_password",
});

export const mockAccountModel = (): AccountModel =>
  Object.assign({}, mockAddAccoutParams(), {
    id: "any_id",
  });

export const mockFakeAuthentication = (): AuthenticationParams => ({
  email: "any_email",
  password: "any_password",
});
