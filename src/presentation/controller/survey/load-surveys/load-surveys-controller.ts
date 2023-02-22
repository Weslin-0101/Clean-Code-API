import { noContent, ok, serverError } from "../../../helpers/http/http-helper";
import {
  Controller,
  HttpResponse,
  LoadSurveys,
} from "./load-surveys-controller-protocols";

export class LoadSurveysController implements Controller {
  constructor(private readonly _loadSurveys: LoadSurveys) {}

  async handle(request: LoadSurveysController.Request): Promise<HttpResponse> {
    try {
      const surveys = await this._loadSurveys.load(request.accountId);
      return surveys.length ? ok(surveys) : noContent();
    } catch (error) {
      return serverError(error);
    }
  }
}

export namespace LoadSurveysController {
  export type Request = {
    accountId: string;
  };
}
