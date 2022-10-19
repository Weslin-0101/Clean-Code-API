import { HttpRequest, HttpResponse, Validation } from "../../../protocols";
import { Controller } from "./add-survey-controller-protocols";

export class AddSurveyController implements Controller {
    constructor(
        private readonly _validation: Validation
    ) {}

    handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        this._validation.validate(httpRequest.body)
        return null
    }
}