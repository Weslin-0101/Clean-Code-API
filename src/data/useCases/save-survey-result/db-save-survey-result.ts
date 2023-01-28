import { SaveSurveyResultRepository, SurveyResultModel, SaveSurveyResult, SaveSurveyResultModel } from "./db-save-survey-result-protocols";

export class DbSaveSurveyResult implements SaveSurveyResult {
    constructor(private readonly _saveSurveyResultRepository: SaveSurveyResultRepository) {}

    async save(data: SaveSurveyResultModel): Promise<SurveyResultModel> {
        return await this._saveSurveyResultRepository.save(data)
    }
}