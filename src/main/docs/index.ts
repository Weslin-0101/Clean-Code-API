import components from "@/main/docs/components";
import paths from "@/main/docs/paths";
import schemas from "@/main/docs/schemas";

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
  paths,
  schemas,
  components,
};
