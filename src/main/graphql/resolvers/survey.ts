import { adpatResolver } from "@/main/adapters/express/apollo-server-resolver-adapter";
import { makeLoadSurveysController } from "@/main/factories/controllers/load-surveys/load-surveys-controller-factory";

export default {
  Query: {
    surveys: async (parent: any, args: any, context: any) =>
      adpatResolver(makeLoadSurveysController(), args, context),
  },
};
