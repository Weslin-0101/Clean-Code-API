import { Controller } from "@/presentation/protocols";
import { LoadSurveysController } from "@/presentation/controller/survey/load-surveys/load-surveys-controller";
import { makeLogControllerDecorator } from "@/main/factories/decorators/log-controller-decorator-factory";
import { makeDbLoadSurveys } from "@/main/factories/useCases/load-surveys/db-load-surveys";

export const makeLoadSurveysController = (): Controller => {
    const controller = new LoadSurveysController(makeDbLoadSurveys())
    return makeLogControllerDecorator(controller)
}