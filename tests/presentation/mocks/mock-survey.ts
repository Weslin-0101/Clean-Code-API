import { AddSurvey } from "@/domain/useCases/addSurvey";
import { LoadSurveys } from "@/domain/useCases/load-surveys";
import { LoadAnswersBySurvey } from "@/domain/useCases/load-answers-by-survey";
import { SurveyModel } from "@/domain/models/survey";
import { mockSurveysModel, mockSurveyModel } from "@/tests/domain/mocks";
import { CheckSurveyById } from "../controller/survey-result/load-survey-result/load-survye-result-controller-protocols";
import faker from "faker";

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

export class LoadAnswersBySurveySpy implements LoadAnswersBySurvey {
  result = [faker.random.word(), faker.random.word()];
  id: string;

  async loadAnswers(id: string): Promise<LoadAnswersBySurvey.Result> {
    this.id = id;
    return Promise.resolve(this.result);
  }
}

export class CheckSurveyByIdSpy implements CheckSurveyById {
  result = true;
  id: string;

  async checkById(id: string): Promise<CheckSurveyById.Result> {
    this.id = id;
    return Promise.resolve(this.result);
  }
}
