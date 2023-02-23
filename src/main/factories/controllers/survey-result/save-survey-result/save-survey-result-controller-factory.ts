import { Controller } from "@/presentation/protocols";
import { makeLogControllerDecorator } from "@/main/factories/decorators/log-controller-decorator-factory";
import { SaveSurveyResultController } from "@/presentation/controller/survey-result/save-survey-result/save-survey-result-controller";
import { makeDbLoadAnswersBySurvey } from "@/main/factories/useCases/load-answers-by-survey/db-load-answers-by-survey-factory";
import { makeDbSaveSurveyResult } from "@/main/factories/useCases/survey-result/save-survey-result/db-save-survey-result-factory";

export const makeSaveSurveyResultController = (): Controller => {
  const controller = new SaveSurveyResultController(
    makeDbLoadAnswersBySurvey(),
    makeDbSaveSurveyResult()
  );
  return makeLogControllerDecorator(controller);
};
