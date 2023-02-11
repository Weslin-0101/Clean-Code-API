import { AccountModel } from "@/data/useCases/account/add-account/db-add-account.protocols";

export interface LoadAccountByEmailRepository {
  loadByEmail(email: string): Promise<AccountModel>;
}
