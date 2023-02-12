import {
  loginPath,
  surveyPath,
  signUpPath,
  surveyResultPath,
} from "@/main/docs/paths/";

export default {
  "/login": loginPath,
  "/signup": signUpPath,
  "/surveys": surveyPath,
  "/surveys:{surveyId}/results": surveyResultPath,
};
