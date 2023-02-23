import { Controller } from "@/presentation/protocols";
import { makeLogControllerDecorator } from "@/main/factories/decorators/log-controller-decorator-factory";
import { makeDbCheckSurveyById } from "@/main/factories/useCases/check-survey-by-id/db-check-survey-by-id-factory";
import { makeDbLoadSurveyResult } from "@/main/factories/useCases/survey-result/load-survey-result/db-load-survey-result-factory";
import { LoadSurveyResultController } from "@/presentation/controller/survey-result/load-survey-result/load-survey-result-controller";

export const makeLoadSurveyResultController = (): Controller => {
  const controller = new LoadSurveyResultController(
    makeDbCheckSurveyById(),
    makeDbLoadSurveyResult()
  );
  return makeLogControllerDecorator(controller);
};
