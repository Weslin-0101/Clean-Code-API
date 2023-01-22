import { AddSurvey } from "@/domain/useCases/addSurvey";
import { SurveyMongoRepository } from "@/infra/db/mongodb/survey/survey-mongo-repository";
import { DbAddSurvey } from "@/data/useCases/add-survey/db-add-survey";

export const makeDbAddSurvey = (): AddSurvey => {
    const surveyMongoRepository = new SurveyMongoRepository()
    return new DbAddSurvey(surveyMongoRepository)
}