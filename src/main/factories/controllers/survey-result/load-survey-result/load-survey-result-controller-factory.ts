import { Controller } from "@/presentation/protocols";
import { makeLogControllerDecorator } from "@/main/factories/decorators/log-controller-decorator-factory";
import { makeDbLoadSurveyById } from "@/main/factories/useCases/load-survey-by-id/db-load-survey-by-id-factory";
import { makeDbLoadSurveyResult } from "@/main/factories/useCases/survey-result/load-survey-result/db-load-survey-result-factory";
import { LoadSurveyResultController } from "@/presentation/controller/survey-result/load-survey-result/load-survey-result-controller";

export const makeLoadSurveyResultController = (): Controller => {
  const controller = new LoadSurveyResultController(
    makeDbLoadSurveyById(),
    makeDbLoadSurveyResult()
  );
  return makeLogControllerDecorator(controller);
};
