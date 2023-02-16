import { SaveSurveyResultRepository } from "@/data/protocols/db/survey/save-survey-result-repository";
import { LoadSurveyResultRepository } from "@/data/protocols/db/survey/load-survey-result-repository";
import { SaveSurveyResultParams } from "@/domain/useCases/save-survey-result";
import { SurveyResultModel } from "@/domain/models/survey-result";
import { mockSurveyResultModel } from "@/domain/test/mock-survey-result";

export const mockSaveSurveyResultRepository =
  (): SaveSurveyResultRepository => {
    class SaveSurveyResultRepositoryStub implements SaveSurveyResultRepository {
      async save(data: SaveSurveyResultParams): Promise<void> {
        return Promise.resolve();
      }
    }
    return new SaveSurveyResultRepositoryStub();
  };

export const mockLoadSurveyResultRepository =
  (): LoadSurveyResultRepository => {
    class LoadSurveyResultRepositoryStub implements LoadSurveyResultRepository {
      loadBySurveyId(surveyId: string): Promise<SurveyResultModel> {
        return Promise.resolve(mockSurveyResultModel());
      }
    }
    return new LoadSurveyResultRepositoryStub();
  };
