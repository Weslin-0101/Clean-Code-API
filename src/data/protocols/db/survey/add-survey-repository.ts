import { AddSurveyParams } from "@/domain/useCases/addSurvey";

export interface AddSurveyRepository {
  add(surveyData: AddSurveyParams): Promise<void>;
}
