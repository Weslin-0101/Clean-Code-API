import { AddSurvey } from "@/domain/useCases/addSurvey";
import { LoadSurveys } from "@/domain/useCases/load-surveys";
import { LoadSurveyById } from "@/domain/useCases/load-survey-by-id";
import { SurveyModel } from "@/domain/models/survey";
import { mockSurveysModel, mockSurveyModel } from "@/tests/domain/mocks";

export class AddSurveySpy implements AddSurvey {
  addSurveyParams: AddSurvey.Params;

  async add(data: AddSurvey.Params): Promise<void> {
    this.addSurveyParams = data;
    return Promise.resolve();
  }
}

export class LoadSurveysSpy implements LoadSurveys {
  surveyModels = mockSurveysModel();
  accountId: string;

  async load(accountId: string): Promise<SurveyModel[]> {
    this.accountId = accountId;
    return Promise.resolve(this.surveyModels);
  }
}

export class LoadSurveyByIdSpy implements LoadSurveyById {
  surveyModel = mockSurveyModel();
  id: string;

  async loadById(id: string): Promise<SurveyModel> {
    this.id = id;
    return Promise.resolve(this.surveyModel);
  }
}
