import {
  SaveSurveyResult,
  SaveSurveyResultParams,
} from "@/domain/useCases/save-survey-result";
import { SurveyResultModel } from "@/domain/models/survey-result";
import { LoadSurveyResult } from "@/domain/useCases/load-survey-result";
import { mockSurveyResultModel } from "@/tests/domain/mocks";

export class SaveSurveyResultSpy implements SaveSurveyResult {
  surveyResultModel = mockSurveyResultModel();
  saveSurveyResultParams: SaveSurveyResultParams;

  async save(data: SaveSurveyResultParams): Promise<SurveyResultModel> {
    this.saveSurveyResultParams = data;
    return Promise.resolve(this.surveyResultModel);
  }
}

export class LoadSurveyResultSpy implements LoadSurveyResult {
  surveyResultModel = mockSurveyResultModel();
  surveyId: string;
  accountId: string;

  async load(surveyId: string, accountId: string): Promise<SurveyResultModel> {
    this.surveyId = surveyId;
    this.accountId = accountId;
    return Promise.resolve(this.surveyResultModel);
  }
}