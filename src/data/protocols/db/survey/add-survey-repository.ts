import { AddSurveyParams } from "@/domain/useCases/addSurvey";

export interface AddSurveyRepository {
  add(data: AddSurveyParams): Promise<void>;
}
