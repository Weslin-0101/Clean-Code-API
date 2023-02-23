import {
  LoadSurveyByIdRepository,
  LoadAnswersBySurvey,
} from "./db-load-answers-by-survey-protocols";

export class DbLoadAnswersBySurvey implements LoadAnswersBySurvey {
  constructor(
    private readonly _loadSurveyByIdRepository: LoadSurveyByIdRepository
  ) {}

  async loadAnswers(id: string): Promise<LoadAnswersBySurvey.Result> {
    const survey = await this._loadSurveyByIdRepository.loadById(id);
    return survey?.answers.map((a) => a.answer) || [];
  }
}
