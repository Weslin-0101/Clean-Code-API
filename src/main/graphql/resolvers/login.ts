import { adpatResolver } from "@/main/adapters/express/apollo-server-resolver-adapter";
import { makeLoginController } from "@/main/factories/controllers/login/login-controller-factory";
import { makeSignUpController } from "@/main/factories/controllers/signup/signup-controller-factory";

export default {
  Query: {
    login: async (parent: any, args: any) =>
      adpatResolver(makeLoginController(), args),
  },
  Mutation: {
    signup: async (parent: any, args: any) =>
      adpatResolver(makeSignUpController(), args),
  },
};
