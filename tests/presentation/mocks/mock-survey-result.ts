import { SaveSurveyResult } from "@/domain/useCases/save-survey-result";
import { LoadSurveyResult } from "@/domain/useCases/load-survey-result";
import { mockSurveyResultModel } from "@/tests/domain/mocks";

export class SaveSurveyResultSpy implements SaveSurveyResult {
  result = mockSurveyResultModel();
  saveSurveyResultParams: SaveSurveyResult.Params;

  async save(data: SaveSurveyResult.Params): Promise<SaveSurveyResult.Result> {
    this.saveSurveyResultParams = data;
    return Promise.resolve(this.result);
  }
}

export class LoadSurveyResultSpy implements LoadSurveyResult {
  result = mockSurveyResultModel();
  surveyId: string;
  accountId: string;

  async load(
    surveyId: string,
    accountId: string
  ): Promise<LoadSurveyResult.Result> {
    this.surveyId = surveyId;
    this.accountId = accountId;
    return Promise.resolve(this.result);
  }
}
