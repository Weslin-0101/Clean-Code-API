import { AddSurveyModel, AddSurveyRepository } from '../../../../data/useCases/add-survey/db-add-survey.protocols';
import { MongoHelper } from '../helpes/mongo-helper'


export class SurveyMongoRepository implements AddSurveyRepository {
    async add(surveyData: AddSurveyModel): Promise<void> {
        const surveyCollection = await MongoHelper.getCollection('surveys')
        await surveyCollection.insertOne(surveyData)
    }
}