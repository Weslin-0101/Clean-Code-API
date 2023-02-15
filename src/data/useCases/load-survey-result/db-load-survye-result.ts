import { LoadSurveyResultRepository } from "@/data/protocols/db/survey/load-survey-result-repository";
import { LoadSurveyResult } from "@/domain/useCases/load-survey-result";
import { SurveyResultModel } from "../survey-result/save-survey-result/db-save-survey-result-protocols";

export class DbLoadSurveyResult implements LoadSurveyResult {
  constructor(
    private readonly _loadSurveyResultRepository: LoadSurveyResultRepository
  ) {}

  async load(surveyId: string): Promise<SurveyResultModel> {
    await this._loadSurveyResultRepository.loadBySurveyId(surveyId);
    return null;
  }
}
