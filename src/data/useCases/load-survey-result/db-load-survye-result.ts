import {
  LoadSurveyResultRepository,
  SurveyResultModel,
  LoadSurveyResult,
} from "./db-load-survey-result-protocols";

export class DbLoadSurveyResult implements LoadSurveyResult {
  constructor(
    private readonly _loadSurveyResultRepository: LoadSurveyResultRepository
  ) {}

  async load(surveyId: string): Promise<SurveyResultModel> {
    const surveyResult = await this._loadSurveyResultRepository.loadBySurveyId(
      surveyId
    );
    return surveyResult;
  }
}
