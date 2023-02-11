import {
  SaveSurveyResult,
  SaveSurveyResultParams,
} from "@/domain/useCases/save-survey-result";
import { SurveyResultModel } from "@/domain/models/survey-result";
import { mockSurveyResultModel } from "@/domain/test";

export const mockSaveSurveyResult = (): SaveSurveyResult => {
  class SaveSurveyResultStub implements SaveSurveyResult {
    async save(data: SaveSurveyResultParams): Promise<SurveyResultModel> {
      return Promise.resolve(mockSurveyResultModel());
    }
  }
  return new SaveSurveyResultStub();
};
