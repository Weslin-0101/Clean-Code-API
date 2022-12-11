import { ok, serverError } from "../../../helpers/http/http-helper";
import { Controller, HttpRequest, HttpResponse, LoadSurveys } from "./load-surveys-controller-protocols";

export class LoadSurveysController implements Controller {
    constructor(private readonly _loadSurveys: LoadSurveys) {}

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const surveys = await this._loadSurveys.load()
            return ok(surveys)
        } catch (error) {
            return serverError(error)
        }
    }
}