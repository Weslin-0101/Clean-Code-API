import { AddAccountParams } from "@/domain/useCases/addAccount";
import { AccountModel } from "@/domain/models/account";

export interface AddAccountRepository {
  add(data: AddAccountParams): Promise<AccountModel>;
}
