import {
  LoadSurveyResultRepository,
  LoadSurveyResult,
  LoadSurveyByIdRepository,
} from "./db-load-survey-result-protocols";

export class DbLoadSurveyResult implements LoadSurveyResult {
  constructor(
    private readonly _loadSurveyResultRepository: LoadSurveyResultRepository,
    private readonly _loadSurveyByIdRepository: LoadSurveyByIdRepository
  ) {}

  async load(
    surveyId: string,
    accountId: string
  ): Promise<LoadSurveyResult.Result> {
    let surveyResult = await this._loadSurveyResultRepository.loadBySurveyId(
      surveyId,
      accountId
    );
    if (!surveyResult) {
      const survey = await this._loadSurveyByIdRepository.loadById(surveyId);
      surveyResult = {
        surveyId: survey.id,
        question: survey.question,
        date: survey.date,
        answers: survey.answers.map((answer) =>
          Object.assign({}, answer, {
            count: 0,
            percent: 0,
            isCurrentAccountAnswer: false,
          })
        ),
      };
    }
    return surveyResult;
  }
}
