import { AddSurvey, AddSurveyParams } from "@/domain/useCases/addSurvey";
import { LoadSurveys } from "@/domain/useCases/load-surveys";
import { LoadSurveyById } from "@/domain/useCases/load-survey-by-id";
import { SurveyModel } from "@/domain/models/survey";
import { mockSurveysModel, mockSurveyModel } from "@/domain/test";

export const mockAddSurvey = (): AddSurvey => {
  class AddSurveyStub implements AddSurvey {
    async add(data: AddSurveyParams): Promise<void> {
      return Promise.resolve();
    }
  }

  return new AddSurveyStub();
};

export const mockSurveysFactory = (): LoadSurveys => {
  class LoadSurveyStub implements LoadSurveys {
    async load(): Promise<SurveyModel[]> {
      return Promise.resolve(mockSurveysModel());
    }
  }

  return new LoadSurveyStub();
};

export const mockLoadSurveyById = (): LoadSurveyById => {
  class LoadSurveyByIdStub implements LoadSurveyById {
    loadById(id: string): Promise<SurveyModel> {
      return Promise.resolve(mockSurveyModel());
    }
  }
  return new LoadSurveyByIdStub();
};
