import { Controller } from "../../../../presentation/protocols";
import { makeLogControllerDecorator } from "../../decorators/log-controller-decorator-factory";
import { LoadSurveysController } from "../../../../presentation/controller/survey/load-surveys/load-surveys-controller";
import { makeDbLoadSurveys } from "../../useCases/load-surveys/db-load-surveys";

export const makeLoadSurveysController = (): Controller => {
    const controller = new LoadSurveysController(makeDbLoadSurveys())
    return makeLogControllerDecorator(controller)
}