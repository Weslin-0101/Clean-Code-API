import { adpatResolver } from "@/main/adapters/express/apollo-server-resolver-adapter";
import { makeLoginController } from "@/main/factories/controllers/login/login-controller-factory";

export default {
  Query: {
    login: async (parent: any, args: any) =>
      adpatResolver(makeLoginController(), args),
  },
};
