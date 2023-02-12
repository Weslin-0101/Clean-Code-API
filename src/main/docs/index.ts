import {
  badRequest,
  serverError,
  unauthorized,
  notFound,
  success,
  forbidden,
} from "@/main/docs/components";
import {
  loginPath,
  surveyPath,
  signUpPath,
  surveyResultPath,
} from "@/main/docs/paths";
import {
  accountSchema,
  loginParamsSchema,
  errorSchema,
  surveyAnswerSchema,
  surveySchema,
  surveysSchema,
  apiKeyAuthSchema,
  signUpParamsSchema,
  addSurveyParamsSchema,
  saveSurveyParamsSchema,
  surveyResultSchema,
} from "@/main/docs/schemas";

export default {
  openapi: "3.0.0",
  info: {
    title: "Clean Node API",
    description:
      "API do curso de NodeJs, Typescript, TDD, clean architecture e SOLID",
    version: "1.0.0",
  },
  license: {
    name: "ISC",
    url: "https://opensource.org/licenses/ISC",
  },
  servers: [
    {
      url: "/api",
    },
  ],
  tags: [
    {
      name: "Login",
    },
    {
      name: "Enquete",
    },
  ],
  paths: {
    "/login": loginPath,
    "/signup": signUpPath,
    "/surveys": surveyPath,
    "/surveys:{surveyId}/results": surveyResultPath,
  },
  schemas: {
    account: accountSchema,
    loginParams: loginParamsSchema,
    signUpParams: signUpParamsSchema,
    addSurveyParams: addSurveyParamsSchema,
    error: errorSchema,
    surveys: surveysSchema,
    survey: surveySchema,
    surveyAnswer: surveyAnswerSchema,
    saveSurveyParams: saveSurveyParamsSchema,
    surveyResult: surveyResultSchema,
  },
  components: {
    securitySchemes: {
      apiKeyAuth: apiKeyAuthSchema,
    },
    success,
    badRequest,
    serverError,
    unauthorized,
    notFound,
    forbidden,
  },
};
