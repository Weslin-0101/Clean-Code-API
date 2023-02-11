import { AccountModel } from "@/data/useCases/account/add-account/db-add-account.protocols";

export interface LoadAccountByTokenRepository {
  loadByToken(token: string, role?: string): Promise<AccountModel>;
}
