import { badRequest } from "../../../helpers/http/http-helper";
import { HttpRequest, HttpResponse, Validation } from "../../../protocols";
import { Controller, AddSurvey } from "./add-survey-controller-protocols";

export class AddSurveyController implements Controller {
    constructor(
        private readonly _validation: Validation,
        private readonly _addSurvey: AddSurvey
    ) {}

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        const error = this._validation.validate(httpRequest.body)
        if (error) {
            return Promise.resolve(badRequest(error))
        }

        const { question, answers } = httpRequest.body
        await this._addSurvey.add({
            question,
            answers
        })
        return null
    }
}