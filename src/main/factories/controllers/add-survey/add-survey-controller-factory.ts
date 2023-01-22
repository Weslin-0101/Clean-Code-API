import { Controller } from "@/presentation/protocols";
import { AddSurveyController } from "@/presentation/controller/survey/add-survey/add-survey-controller";
import { makeLogControllerDecorator } from "@/main/factories/decorators/log-controller-decorator-factory";
import { makeDbAddSurvey } from "@/main/factories/useCases/add-survey/add-account-factory";
import { makeAddSurveyValidation } from "./add-survey-validation-factory";

export const makeAddSurveyController = (): Controller => {
    const controller = new AddSurveyController(makeAddSurveyValidation(), makeDbAddSurvey())
    return makeLogControllerDecorator(controller)
}