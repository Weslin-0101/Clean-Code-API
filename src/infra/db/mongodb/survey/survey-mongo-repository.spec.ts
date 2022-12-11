import { Collection, ObjectId } from 'mongodb'
import { MongoHelper } from '../helpes/mongo-helper'
import { SurveyMongoRepository } from './survey-mongo-repository'

let surveyCollection: Collection

describe('Survey Mongo Repository', () => {
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

    test('Should add a survey on success', async () => {
        const sut = new SurveyMongoRepository()
        await sut.add({
            question: 'any_question',
            answers: [{
                image: 'any_image',
                answer: 'any_answer'
            }, {
                answer: 'other_answer'
            }],
            date: new Date()
        })
        const survey = await surveyCollection.findOne({ question: 'any_question' })
        expect(survey).toBeTruthy()
    })
})