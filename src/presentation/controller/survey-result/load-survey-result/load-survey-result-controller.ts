import { InvalidParamError } from "@/presentation/errors";
import {
  forbidden,
  serverError,
} from "@/presentation/helpers/http/http-helper";
import {
  Controller,
  HttpRequest,
  HttpResponse,
  LoadSurveyById,
  LoadSurveyResult,
} from "./load-survye-result-controller-protocols";

export class LoadSurveyResultController implements Controller {
  constructor(
    private readonly _loadSurveyById: LoadSurveyById,
    private readonly _loadSuveyResult: LoadSurveyResult
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { surveyId } = httpRequest.params;
      const survey = await this._loadSurveyById.loadById(surveyId);
      if (!survey) {
        return forbidden(new InvalidParamError("surveyId"));
      }
      await this._loadSuveyResult.load(surveyId);
      return null;
    } catch (error) {
      return serverError(error);
    }
  }
}
