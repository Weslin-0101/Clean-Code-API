import { SurveyMongoRepository } from "@/infra/db/mongodb/survey/survey-mongo-repository";
import { CheckSurveyById } from "@/domain/useCases/check-survey-by-id";
import { DbCheckSurveyById } from "@/data/useCases/survey/check-survey-by-id/db-check-survey-by-id";

export const makeDbCheckSurveyById = (): CheckSurveyById => {
  const surveyMongoRepository = new SurveyMongoRepository();
  return new DbCheckSurveyById(surveyMongoRepository);
};
