import {
  LoadAnswersBySurveyRepository,
  LoadAnswersBySurvey,
} from "./db-load-answers-by-survey-protocols";

export class DbLoadAnswersBySurvey implements LoadAnswersBySurvey {
  constructor(
    private readonly _loadAnswersBySurveyRepository: LoadAnswersBySurveyRepository
  ) {}

  async loadAnswers(id: string): Promise<LoadAnswersBySurvey.Result> {
    return await this._loadAnswersBySurveyRepository.loadAnswers(id);
  }
}
