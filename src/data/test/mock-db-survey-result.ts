import { SaveSurveyResultRepository } from "@/data/protocols/db/survey/save-survey-result-repository";
import { LoadSurveyResultRepository } from "@/data/protocols/db/survey/load-survey-result-repository";
import { SaveSurveyResultParams } from "@/domain/useCases/save-survey-result";
import { SurveyResultModel } from "@/domain/models/survey-result";
import { mockSurveyResultModel } from "@/domain/test/mock-survey-result";

export class SaveSurveyResultRepositorySpy
  implements SaveSurveyResultRepository
{
  saveSurveyResultParams: SaveSurveyResultParams;

  async save(data: SaveSurveyResultParams): Promise<void> {
    this.saveSurveyResultParams = data;
    return Promise.resolve();
  }
}

export class LoadSurveyResultRepositorySpy
  implements LoadSurveyResultRepository
{
  surveyResultModel = mockSurveyResultModel();
  surveyId: string;

  async loadBySurveyId(surveyId: string): Promise<SurveyResultModel> {
    this.surveyId = surveyId;
    return Promise.resolve(this.surveyResultModel);
  }
}
