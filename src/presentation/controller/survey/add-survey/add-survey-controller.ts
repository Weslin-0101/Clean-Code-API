import {
  badRequest,
  noContent,
  serverError,
} from "../../../helpers/http/http-helper";
import { HttpResponse, Validation } from "../../../protocols";
import { Controller, AddSurvey } from "./add-survey-controller-protocols";

export class AddSurveyController implements Controller {
  constructor(
    private readonly _validation: Validation,
    private readonly _addSurvey: AddSurvey
  ) {}

  async handle(request: AddSurveyController.Request): Promise<HttpResponse> {
    try {
      const error = this._validation.validate(request);
      if (error) {
        return Promise.resolve(badRequest(error));
      }

      const { question, answers } = request;
      await this._addSurvey.add({
        question,
        answers,
        date: new Date(),
      });
      return noContent();
    } catch (error) {
      return serverError(error);
    }
  }
}

export namespace AddSurveyController {
  export type Request = {
    question: string;
    answers: Answer[];
  };

  type Answer = {
    image?: string;
    answer: string;
  };
}
