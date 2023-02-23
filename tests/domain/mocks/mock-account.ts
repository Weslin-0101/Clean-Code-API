import { AddAccount } from "@/domain/useCases/addAccount";
import { Authentication } from "@/domain/useCases/authentication";
import faker from "faker";

export const mockAddAccountParams = (): AddAccount.Params => ({
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
});

export const mockAuthenticationParams = (): Authentication.Params => ({
  email: faker.internet.email(),
  password: faker.internet.password(),
});
