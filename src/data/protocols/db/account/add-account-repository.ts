import { AddAccount } from "@/domain/useCases/addAccount";
export interface AddAccountRepository {
  add(data: AddAccountRepository.Params): Promise<AddAccountRepository.Result>;
}

export namespace AddAccountRepository {
  export type Params = AddAccount.Params;
  export type Result = boolean;
}
