import { AddSurveyRepository } from "@/data/protocols/db/survey/add-survey-repository";
import { LoadSurveyByIdRepository } from "@/data/protocols/db/survey/load-survey-by-id-repository";
import { LoadSurveysRepository } from "@/data/protocols/db/survey/load-survey-repository";
import { AddSurveyParams } from "@/domain/useCases/addSurvey";
import { SurveyModel } from "@/domain/models/survey";
import { mockSurveyModel, mockSurveysModel } from "@/domain/test";

export const mockAddSurveyRepository = (): AddSurveyRepository => {
  class AddSurveyRepositoryStub implements AddSurveyRepository {
    add(surveyData: AddSurveyParams): Promise<void> {
      return new Promise((resolve) => resolve());
    }
  }
  return new AddSurveyRepositoryStub();
};

export const mockLoadSurveyByIdRepository = (): LoadSurveyByIdRepository => {
  class LoadSurveyByIdRepositoryStub implements LoadSurveyByIdRepository {
    loadById(id: string): Promise<SurveyModel> {
      return new Promise((resolve) => resolve(mockSurveyModel()));
    }
  }
  return new LoadSurveyByIdRepositoryStub();
};

export const mockLoadSurveysRepository = (): LoadSurveysRepository => {
  class LoadSurveysRepositoryStub implements LoadSurveysRepository {
    loadAll(): Promise<SurveyModel[]> {
      return new Promise((resolve) => resolve(mockSurveysModel()));
    }
  }
  return new LoadSurveysRepositoryStub();
};
