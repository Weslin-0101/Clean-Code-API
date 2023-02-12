import {
  badRequest,
  serverError,
  unauthorized,
  notFound,
  success,
} from "@/main/docs/components";
import { loginPath } from "@/main/docs/paths";
import {
  accountSchema,
  loginParamsSchema,
  errorSchema,
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
  ],
  paths: {
    "/login": loginPath,
  },
  schemas: {
    account: accountSchema,
    loginParams: loginParamsSchema,
    error: errorSchema,
  },
  components: {
    success,
    badRequest,
    serverError,
    unauthorized,
    notFound,
  },
};
