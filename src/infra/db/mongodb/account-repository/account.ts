import { AddAccountRepository } from "../../../../data/protocols/db/add-account-repository";
import { LoadAccountByEmailRepository } from "../../../../data/protocols/db/load-account-email-repository";
import { AccountModel } from '../../../../domain/models/account'
import { AddAccountModel } from '../../../../domain/useCases/addAccount'
import { MongoHelper } from '../helpes/mongo-helper'

export class AccountMongoRepository implements AddAccountRepository, LoadAccountByEmailRepository {
    async add(accountData: AddAccountModel): Promise<AccountModel> {
        const accountCollection = await MongoHelper.getCollection('accounts')
        const result = await accountCollection.insertOne(accountData)
        const { insertedId: id } = result
        const accountById = await accountCollection.findOne({ _id: id })
        return MongoHelper.map(accountById)
    }

    async loadByEmail(email: string): Promise<AccountModel> {
        const accountCollection = await MongoHelper.getCollection('accounts')
        const account = await accountCollection.findOne({ email })
        return account && MongoHelper.map(account)
    }
}