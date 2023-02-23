import {
  SaveSurveyResultRepository,
  SaveSurveyResult,
  LoadSurveyResultRepository,
} from "./db-save-survey-result-protocols";

export class DbSaveSurveyResult implements SaveSurveyResult {
  constructor(
    private readonly _saveSurveyResultRepository: SaveSurveyResultRepository,
    private readonly _loadSurveyResultRepository: LoadSurveyResultRepository
  ) {}

  async save(data: SaveSurveyResult.Params): Promise<SaveSurveyResult.Result> {
    await this._saveSurveyResultRepository.save(data);
    return await this._loadSurveyResultRepository.loadBySurveyId(
      data.surveyId,
      data.accountId
    );
  }
}
