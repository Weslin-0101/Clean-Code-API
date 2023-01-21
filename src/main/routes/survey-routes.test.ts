import { Collection } from 'mongodb'
import request from 'supertest'
import { MongoHelper } from '../../infra/db/mongodb/helpes/mongo-helper'
import app from '../config/app'
import { sign } from 'jsonwebtoken'
import env from '../config/env'

let surveyCollection: Collection
let accountCollection: Collection

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
        accountCollection = await MongoHelper.getCollection('accounts')
        await accountCollection.deleteMany({})
    })

    describe('POST /surveys', () => {
        test('Should return 403 on add survey without accessToken', async () => {
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
                .expect(403)
        })

        test('Should return 204 on add survey with valid accessToken', async () => {
            const res = await accountCollection.insertOne({
                name: 'Lucas',
                email: 'anyemail@email.com',
                password: '123',
                role: 'admin'
            })

            const id = res.insertedId
            const accessToken = sign({ id }, env.jwtSecret)
            await accountCollection.updateOne({
                _id: id
            }, {
                $set: {
                    accessToken
                }
            })
            await request(app)
                .post('/api/surveys')
                .set('x-access-token', accessToken)
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
    
    describe('GET /surveys', () => {
        test('Should return 403 on load surveys without accessToken', async () => {
            await request(app)
                .get('/api/surveys')
                .expect(403)
        })

        test('Should return 204 on load surveys with valid accessToken', async () => {
            const res = await accountCollection.insertOne({
                name: 'Lucas',
                email: 'anyemail@email.com',
                password: '123'
            })

            const id = res.insertedId
            const accessToken = sign({ id }, env.jwtSecret)
            await accountCollection.updateOne({
                _id: id
            }, {
                $set: {
                    accessToken
                }
            })
            await request(app)
                .get('/api/surveys')
                .set('x-access-token', accessToken)
                .expect(204)
        })
    })
})