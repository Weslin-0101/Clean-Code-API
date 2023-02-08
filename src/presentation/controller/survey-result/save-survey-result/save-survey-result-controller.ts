import {
  Controller,
  HttpRequest,
  HttpResponse,
  LoadSurveyById,
} from "./save-survey-result-controller-protocols";

export class SaveSurveyResultController implements Controller {
  constructor(private readonly _loadSurveyById: LoadSurveyById) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    await this._loadSurveyById.loadById(httpRequest.params.surveyId);
    return null;
  }
}
