import { SaveSurveyResultRepository } from "@/data/protocols/db/survey/save-survey-result-repository";
import { SaveSurveyResultParams } from "@/domain/useCases/save-survey-result";
import { SurveyResultModel } from "@/domain/models/survey-result";
import { mockSurveyResultModel } from "@/domain/test/mock-survey-result";

export const mockSaveSurveyResultRepository =
  (): SaveSurveyResultRepository => {
    class SaveSurveyResultRepositoryStub implements SaveSurveyResultRepository {
      async save(data: SaveSurveyResultParams): Promise<SurveyResultModel> {
        return new Promise((resolve) => resolve(mockSurveyResultModel()));
      }
    }
    return new SaveSurveyResultRepositoryStub();
  };
