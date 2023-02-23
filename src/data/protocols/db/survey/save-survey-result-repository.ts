import { SaveSurveyResult } from "@/domain/useCases/save-survey-result";

export interface SaveSurveyResultRepository {
  save(data: SaveSurveyResultRepository.Params): Promise<void>;
}

export namespace SaveSurveyResultRepository {
  export type Params = SaveSurveyResult.Params;
}
