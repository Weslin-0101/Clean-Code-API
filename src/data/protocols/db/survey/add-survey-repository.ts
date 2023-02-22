import { AddSurvey } from "@/domain/useCases/addSurvey";

export interface AddSurveyRepository {
  add(data: AddSurveyRepository.Params): Promise<void>;
}

export namespace AddSurveyRepository {
  export type Params = AddSurvey.Params;
}
