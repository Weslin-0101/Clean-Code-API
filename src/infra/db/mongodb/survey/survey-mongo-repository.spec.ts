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
    
    describe('add()', () => {
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

    describe('loadAll()', () => {
        test('Should load all surveys on success', async () => {
            await surveyCollection.insertMany([{
                question: 'any_question',
                answers: [{
                    image: 'any_image',
                    answer: 'any_answer'
                }, {
                    answer: 'any_answer'
                }],
                date: new Date()
            }, {
                question: 'other_question',
                answers: [{
                    image: 'other_image',
                    answer: 'other_answer'
                }, {
                    answer: 'other_answer'
                }],
                date: new Date()
            }])
            const sut = new SurveyMongoRepository()
            const surveys = await sut.loadAll()
            expect(surveys).toBeInstanceOf(Array)
        })
    })
})