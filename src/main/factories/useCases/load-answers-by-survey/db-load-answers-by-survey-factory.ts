import { SurveyMongoRepository } from "@/infra/db/mongodb/survey/survey-mongo-repository";
import { LoadAnswersBySurvey } from "@/domain/useCases/load-answers-by-survey";
import { DbLoadAnswersBySurvey } from "@/data/useCases/survey/load-answers-by-survey/db-load-answers-by-survey";

export const makeDbLoadAnswersBySurvey = (): LoadAnswersBySurvey => {
  const surveyMongoRepository = new SurveyMongoRepository();
  return new DbLoadAnswersBySurvey(surveyMongoRepository);
};
