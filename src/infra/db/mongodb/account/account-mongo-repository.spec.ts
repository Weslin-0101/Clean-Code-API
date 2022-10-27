import { Collection, ObjectId } from 'mongodb'
import { MongoHelper } from '../helpes/mongo-helper'
import { AccountMongoRepository } from './account-mongo-repository'

let accountCollection: Collection

describe('Account Mongo Repository', () => {
    beforeAll(async () => {
        await MongoHelper.connect(process.env.MONGO_URL)
    }) 

    afterAll(async () => {
        await MongoHelper.disconnect()
    })

    beforeEach(async () => {
        accountCollection = await MongoHelper.getCollection('accounts')
        await accountCollection.deleteMany({})
    })

    test('Should return an account on add succes', async () => {
        const sut = new AccountMongoRepository()
        const account = await sut.add({
            name: 'any_name',
            email: 'any_email@email.com',
            password: 'any_password',
        })
        expect(account).toBeTruthy()
        expect(account.id).toBeTruthy()
        expect(account.name).toBe('any_name')
        expect(account.email).toBe('any_email@email.com')
        expect(account.password).toBe('any_password')
    })

    test('Should return an account on LoadByEmail success', async () => {
        const sut = new AccountMongoRepository()
        await accountCollection.insertOne({
            name: 'any_name',
            email: 'any_email@email.com',
            password: 'any_password',
        })
        const account = await sut.loadByEmail('any_email@email.com')
        expect(account).toBeTruthy()
        expect(account.id).toBeTruthy()
        expect(account.name).toBe('any_name')
        expect(account.email).toBe('any_email@email.com')
        expect(account.password).toBe('any_password')
    })

    test('Should return null if LoadByEmail fails', async () => {
        const sut = new AccountMongoRepository()
        const account = await sut.loadByEmail('any_email@email.com')
        expect(account).toBeFalsy()
    })

    test('Should update the account accessToken on updateAccessToken success', async () => {
        const sut = new AccountMongoRepository()
        const fakeAcccount = await accountCollection.insertOne({
            name: 'any_name',
            email: 'any_email@email.com',
            password: 'any_password'
        })
        await sut.updateAccessToken(fakeAcccount.insertedId.toString(), 'any_token')
        const account = await accountCollection.findOne({ _id: new ObjectId(fakeAcccount.insertedId.toString()) })
        expect(account).toBeTruthy()
        expect(account.accessToken).toBe('any_token')
    })

    test('Should return an account on loadByToken without role', async () => {
        const sut = new AccountMongoRepository()
        await accountCollection.insertOne({
            name: 'any_name',
            email: 'any_email@email.com',
            password: 'any_password',
            accessToken: 'any_token'
        })
        const account = await sut.loadByToken('any_token')
        expect(account).toBeTruthy()
        expect(account.id).toBeTruthy()
        expect(account.name).toBe('any_name')
        expect(account.email).toBe('any_email@email.com')
        expect(account.password).toBe('any_password')
    })
    
    test('Should return an account on loadByToken with role', async () => {
        const sut = new AccountMongoRepository()
        await accountCollection.insertOne({
            name: 'any_name',
            email: 'any_email@email.com',
            password: 'any_password',
            accessToken: 'any_token',
            role: 'any_role'
        })
        const account = await sut.loadByToken('any_token', 'any_role')
        expect(account).toBeTruthy()
        expect(account.id).toBeTruthy()
        expect(account.name).toBe('any_name')
        expect(account.email).toBe('any_email@email.com')
        expect(account.password).toBe('any_password')
    })
})