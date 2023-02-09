import { Controller } from "@/presentation/protocols";
import { LoadSurveysController } from "@/presentation/controller/survey/load-surveys/load-surveys-controller";
import { makeLogControllerDecorator } from "@/main/factories/decorators/log-controller-decorator-factory";
import { SaveSurveyResultController } from "@/presentation/controller/survey-result/save-survey-result/save-survey-result-controller";
import { makeDbLoadSurveyById } from "@/main/factories/useCases/load-survey-by-id/db-load-survey-by-id-factory";
import { makeDbSaveSurveyResult } from "@/main/factories/useCases/survey-result/save-survey-result/db-save-survey-result-factory";

export const makeSaveSurveyResultController = (): Controller => {
  const controller = new SaveSurveyResultController(
    makeDbLoadSurveyById(),
    makeDbSaveSurveyResult()
  );
  return makeLogControllerDecorator(controller);
};
