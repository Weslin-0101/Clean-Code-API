import { Collection } from 'mongodb'
import request from 'supertest'
import { MongoHelper } from '../../infra/db/mongodb/helpes/mongo-helper'
import app from '../config/app'
import { hash } from 'bcrypt'

let surveyCollection: Collection

describe('Survey Routes', () => {
    beforeAll(async () => {
        await MongoHelper.connect(process.env.MONGO_URL)
    }) 

    afterAll(async () => {
        await MongoHelper.disconnect()
    })

    beforeEach(async () => {
        surveyCollection = await MongoHelper.getCollection('surveys')
        await surveyCollection.deleteMany({})
    })

    describe('POST /surveys', () => {
        test('Should return 204 on add survey success', async () => {
            await request(app)
                .post('/api/surveys')
                .send({
                    question: 'Definir comida',
                    answers: [{
                        image: 'https://image.com',
                        answer: 'Pizza'
                    }, {
                        answer: 'Lasanha'
                    }]
                })
                .expect(204)
        })
    })
})