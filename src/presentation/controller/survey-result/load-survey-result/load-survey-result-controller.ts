import { InvalidParamError } from "@/presentation/errors";
import {
  forbidden,
  ok,
  serverError,
} from "@/presentation/helpers/http/http-helper";
import {
  Controller,
  HttpResponse,
  CheckSurveyById,
  LoadSurveyResult,
} from "./load-survye-result-controller-protocols";

export class LoadSurveyResultController implements Controller {
  constructor(
    private readonly _checkSurveyById: CheckSurveyById,
    private readonly _loadSuveyResult: LoadSurveyResult
  ) {}

  async handle(
    request: LoadSurveyResultController.Request
  ): Promise<HttpResponse> {
    try {
      const { surveyId } = request;
      const exists = await this._checkSurveyById.checkById(surveyId);
      if (!exists) {
        return forbidden(new InvalidParamError("surveyId"));
      }
      const surveyResult = await this._loadSuveyResult.load(
        surveyId,
        request.accountId
      );
      return ok(surveyResult);
    } catch (error) {
      return serverError(error);
    }
  }
}

export namespace LoadSurveyResultController {
  export type Request = {
    surveyId: string;
    accountId: string;
  };
}
