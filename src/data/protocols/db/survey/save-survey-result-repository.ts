import { SurveyResultModel } from "@/domain/models/survey-result";
import { SaveSurveyResultParams } from "@/domain/useCases/save-survey-result";

export interface SaveSurveyResultRepository {
  save(data: SaveSurveyResultParams): Promise<SurveyResultModel>;
}
