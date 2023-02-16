import {
  SaveSurveyResultRepository,
  SurveyResultModel,
  SaveSurveyResult,
  SaveSurveyResultParams,
  LoadSurveyResultRepository,
} from "./db-save-survey-result-protocols";

export class DbSaveSurveyResult implements SaveSurveyResult {
  constructor(
    private readonly _saveSurveyResultRepository: SaveSurveyResultRepository,
    private readonly _loadSurveyResultRepository: LoadSurveyResultRepository
  ) {}

  async save(data: SaveSurveyResultParams): Promise<SurveyResultModel> {
    await this._saveSurveyResultRepository.save(data);
    const surveyResult = await this._loadSurveyResultRepository.loadBySurveyId(
      data.surveyId
    );
    return surveyResult;
  }
}
