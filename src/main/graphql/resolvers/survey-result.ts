import { adpatResolver } from "@/main/adapters/express/apollo-server-resolver-adapter";
import { makeLoadSurveyResultController } from "@/main/factories/controllers/survey-result/load-survey-result/load-survey-result-controller-factory";
import { makeSaveSurveyResultController } from "@/main/factories/controllers/survey-result/save-survey-result/save-survey-result-controller-factory";

export default {
  Query: {
    surveyResult: async (parent: any, args: any, context: any) =>
      adpatResolver(makeLoadSurveyResultController(), args, context),
  },

  Mutation: {
    saveSurveyResult: async (parent: any, args: any, context: any) =>
      adpatResolver(makeSaveSurveyResultController(), args, context),
  },
};
