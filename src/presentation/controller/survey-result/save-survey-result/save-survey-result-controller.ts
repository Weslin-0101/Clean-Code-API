import { InvalidParamError } from "@/presentation/errors";
import {
  forbidden,
  ok,
  serverError,
} from "@/presentation/helpers/http/http-helper";
import {
  Controller,
  HttpResponse,
  LoadAnswersBySurvey,
  SaveSurveyResult,
} from "./save-survey-result-controller-protocols";

export class SaveSurveyResultController implements Controller {
  constructor(
    private readonly _loadAnswersBySurvey: LoadAnswersBySurvey,
    private readonly _saveSurveyResult: SaveSurveyResult
  ) {}

  async handle(
    request: SaveSurveyResultController.Request
  ): Promise<HttpResponse> {
    try {
      const { surveyId, answer } = request;
      const answers = await this._loadAnswersBySurvey.loadAnswers(surveyId);
      if (!answers.length) {
        return forbidden(new InvalidParamError("surveyId"));
      } else if (!answers.includes(answer)) {
        return forbidden(new InvalidParamError("answer"));
      }

      const surveyResult = await this._saveSurveyResult.save({
        ...request,
        date: new Date(),
      });
      return ok(surveyResult);
    } catch (error) {
      return serverError(error);
    }
  }
}

export namespace SaveSurveyResultController {
  export type Request = {
    surveyId: string;
    answer: string;
    accountId: string;
  };
}
