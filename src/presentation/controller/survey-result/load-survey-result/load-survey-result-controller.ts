import { InvalidParamError } from "@/presentation/errors";
import { forbidden } from "@/presentation/helpers/http/http-helper";
import {
  Controller,
  HttpRequest,
  HttpResponse,
  LoadSurveyById,
} from "./load-survye-result-controller-protocols";

export class LoadSurveyResultController implements Controller {
  constructor(private readonly _loadSurveyById: LoadSurveyById) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const survey = await this._loadSurveyById.loadById(
      httpRequest.params.surveyId
    );
    if (!survey) {
      return forbidden(new InvalidParamError("surveyId"));
    }

    return null;
  }
}
