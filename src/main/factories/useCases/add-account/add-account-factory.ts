import { BcryptAdapter } from "@/infra/criptography/bcryot-adapter/bcrypt.adapter";
import { AccountMongoRepository } from "@/infra/db/mongodb/account/account-mongo-repository";
import { AddAccount } from "@/domain/useCases/addAccount";
import { DbAddAccount } from "@/data/useCases/account/add-account/db-add-account";

export const makeDbAddAccount = (): AddAccount => {
  const salt = 12;

  const bcryptAdapter = new BcryptAdapter(salt);
  const accountMongoRepository = new AccountMongoRepository();
  return new DbAddAccount(
    bcryptAdapter,
    accountMongoRepository,
    accountMongoRepository
  );
};
