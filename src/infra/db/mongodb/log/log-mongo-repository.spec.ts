import { Collection } from "mongodb"
import { MongoHelper } from "../helpes/mongo-helper"
import { LogMongoRepository } from './log-mongo-repository'

const makeSut = (): LogMongoRepository => {
    return new LogMongoRepository()
}

describe('Log mongo Repository', () => {
    let logCollection: Collection

    beforeAll(async () => {
        await MongoHelper.connect(process.env.MONGO_URL)
    }) 

    afterAll(async () => {
        await MongoHelper.disconnect()
    })

    beforeEach(async () => {
        logCollection = await MongoHelper.getCollection('errors')
        await logCollection.deleteMany({})
    })

    test('Should create an error log on success', async () => {
        const sut = makeSut()
        await sut.logError('any_error')
        const count = await logCollection.countDocuments()
        expect(count).toBe(1)
    })
})