import { Controller, HttpRequest, HttpResponse, LoadSurveys } from "./load-surveys-controller-protocols";

export class LoadSurveysController implements Controller {
    constructor(private readonly _loadSurveys: LoadSurveys) {}

    handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        this._loadSurveys.load()
        return Promise.resolve(null)
    }
}