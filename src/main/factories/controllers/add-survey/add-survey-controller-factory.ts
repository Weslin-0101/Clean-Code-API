import { Controller } from "../../../../presentation/protocols";
import { makeLogControllerDecorator } from "../../decorators/log-controller-decorator-factory";
import { AddSurveyController } from "../../../../presentation/controller/survey/add-survey/add-survey-controller";
import { makeAddSurveyValidation } from "./add-survey-validation-factory";
import { makeDbAddSurvey } from "../../useCases/add-survey/add-account-factory";

export const makeAddSurveyController = (): Controller => {
    const controller = new AddSurveyController(makeAddSurveyValidation(), makeDbAddSurvey())
    return makeLogControllerDecorator(controller)
}