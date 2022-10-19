import { badRequest } from "../../../helpers/http/http-helper";
import { HttpRequest, HttpResponse, Validation } from "../../../protocols";
import { Controller } from "./add-survey-controller-protocols";

export class AddSurveyController implements Controller {
    constructor(
        private readonly _validation: Validation
    ) {}

    handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        const error = this._validation.validate(httpRequest.body)
        if (error) {
            return Promise.resolve(badRequest(error))
        }
        return null
    }
}