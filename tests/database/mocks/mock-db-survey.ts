import { AddSurveyRepository } from "@/data/protocols/db/survey/add-survey-repository";
import { CheckSurveyByIdRepository } from "@/data/protocols/db/survey/check-survey-by-id-repository";
import { LoadAnswersBySurveyRepository } from "@/data/protocols/db/survey/load-answers-by-survey-repository";
import { LoadSurveyByIdRepository } from "@/data/protocols/db/survey/load-survey-by-id-repository";
import { LoadSurveysRepository } from "@/data/protocols/db/survey/load-survey-repository";
import { SurveyModel } from "@/domain/models/survey";
import { mockSurveyModel, mockSurveysModel } from "@/tests/domain/mocks";
import faker from "faker";

export class AddSurveyRepositorySpy implements AddSurveyRepository {
  addSurveyParams: AddSurveyRepository.Params;

  async add(data: AddSurveyRepository.Params): Promise<void> {
    this.addSurveyParams = data;
    return Promise.resolve();
  }
}

export class LoadSurveyByIdRepositorySpy implements LoadSurveyByIdRepository {
  result = mockSurveyModel();
  id: string;

  async loadById(id: string): Promise<LoadSurveyByIdRepository.Result> {
    this.id = id;
    return Promise.resolve(this.result);
  }
}

export class LoadAnswersBySurveyRepositorySpy
  implements LoadAnswersBySurveyRepository
{
  result = [faker.random.word(), faker.random.word()];
  id: string;

  async loadAnswers(id: string): Promise<LoadAnswersBySurveyRepository.Result> {
    this.id = id;
    return Promise.resolve(this.result);
  }
}

export class CheckSurveyByIdRepositorySpy implements CheckSurveyByIdRepository {
  result = true;
  id: string;

  async checkById(id: string): Promise<CheckSurveyByIdRepository.Result> {
    this.id = id;
    return Promise.resolve(this.result);
  }
}

export class LoadSurveysRepositorySpy implements LoadSurveysRepository {
  surveyModels = mockSurveysModel();
  accountId: string;

  async loadAll(accountId: string): Promise<SurveyModel[]> {
    this.accountId = accountId;
    return Promise.resolve(this.surveyModels);
  }
}
