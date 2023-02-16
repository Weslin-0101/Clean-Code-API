import {
  Controller,
  HttpRequest,
  HttpResponse,
  LoadSurveyById,
} from "./load-survye-result-controller-protocols";

export class LoadSurveyResultController implements Controller {
  constructor(private readonly _loadSurveyById: LoadSurveyById) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    await this._loadSurveyById.loadById(httpRequest.params.surveyId);
    return Promise.resolve(null);
  }
}
