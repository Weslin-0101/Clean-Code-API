import { SaveSurveyResultModel, SaveSurveyResultRepository, SurveyResultModel } from "@/data/useCases/save-survey-result/db-save-survey-result-protocols";
import { MongoHelper } from "../helpes/mongo-helper";

export class SurveyResultMongoRepository implements SaveSurveyResultRepository {
    // Função totalmente errada. Possível manutenção futura.
    async save(data: SaveSurveyResultModel): Promise<SurveyResultModel> {
        const surveyResultCollection = await MongoHelper.getCollection('surveyResults')
        const res = await surveyResultCollection.findOneAndUpdate({
            surveyId: data.surveyId,
            accountId: data.accountId
        }, {
            $set: {
                answer: <never>data.answer,
                date: <never>data.date
            }
        })
        return res.value && MongoHelper.map(res.value)
    }
}