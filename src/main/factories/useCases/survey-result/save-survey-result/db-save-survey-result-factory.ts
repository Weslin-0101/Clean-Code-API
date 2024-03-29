import { SaveSurveyResult } from "@/domain/useCases/save-survey-result";
import { DbSaveSurveyResult } from "@/data/useCases/survey-result/save-survey-result/db-save-survey-result";
import { SurveyResultMongoRepository } from "@/infra/db/mongodb/survey-result/survey-result-mongo-repository";

export const makeDbSaveSurveyResult = (): SaveSurveyResult => {
  const surveyResultMongoRepository = new SurveyResultMongoRepository();
  return new DbSaveSurveyResult(
    surveyResultMongoRepository,
    surveyResultMongoRepository
  );
};
