import { AddAccountRepository } from "../../../../data/protocols/add-account-repository";
import { AccountModel } from '../../../../domain/models/account'
import { AddAccountModel } from '../../../../domain/useCases/addAccount'
import { MongoHelper } from '../helpes/mongo-helper'

export class AccountMongoRepository implements AddAccountRepository {
    async add(accountData: AddAccountModel): Promise<AccountModel> {
        const accountCollection = await MongoHelper.getCollection('accounts')
        const accountToBeInserted = Object.assign({}, accountData)
        const result = await accountCollection.insertOne(accountToBeInserted)
        return Object.assign({}, accountData, { id: result.insertedId.toHexString() })
    }
}