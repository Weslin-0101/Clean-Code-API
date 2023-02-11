import {
  SaveSurveyResultRepository,
  SurveyResultModel,
  SaveSurveyResult,
  SaveSurveyResultParams,
} from "./db-save-survey-result-protocols";

export class DbSaveSurveyResult implements SaveSurveyResult {
  constructor(
    private readonly _saveSurveyResultRepository: SaveSurveyResultRepository
  ) {}

  async save(data: SaveSurveyResultParams): Promise<SurveyResultModel> {
    return await this._saveSurveyResultRepository.save(data);
  }
}
