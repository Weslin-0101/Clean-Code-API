import { SaveSurveyResultParams } from "@/domain/useCases/save-survey-result";
import { SurveyResultModel } from "@/domain/models/survey-result";

export const mockFakeSurveyResultData = (): SaveSurveyResultParams => ({
  accountId: "any_account_id",
  surveyId: "any_survey_id",
  answer: "any_answer",
  date: new Date(),
});

export const mockSurveyResultModel = (): SurveyResultModel =>
  Object.assign({}, mockFakeSurveyResultData(), {
    id: "any_id",
  });
