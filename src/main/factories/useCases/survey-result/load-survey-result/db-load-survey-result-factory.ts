import { SurveyResultMongoRepository } from "@/infra/db/mongodb/survey-result/survey-result-mongo-repository";
import { LoadSurveyResult } from "@/domain/useCases/load-survey-result";
import { DbLoadSurveyResult } from "@/data/useCases/load-survey-result/db-load-survye-result";
import { SurveyMongoRepository } from "@/infra/db/mongodb/survey/survey-mongo-repository";

export const makeDbLoadSurveyResult = (): LoadSurveyResult => {
  const surveyResultMongoRepository = new SurveyResultMongoRepository();
  const surveytMongoRepository = new SurveyMongoRepository();
  return new DbLoadSurveyResult(
    surveyResultMongoRepository,
    surveytMongoRepository
  );
};
