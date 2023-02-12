export const loginPath = {
  post: {
    tags: ["Login"],
    summary: "API para autenticar usuário",
    requestBody: {
      content: {
        "application/json": {
          schema: {
            $ref: "#/schemas/loginParams",
          },
        },
      },
    },
    responses: {
      200: {
        $ref: "#/components/success",
      },
      400: {
        $ref: "#/components/badRequest",
      },
      401: {
        $ref: "#/components/unauthorized",
      },
      404: {
        $ref: "#/components/notFound",
      },
      500: {
        $ref: "#/components/serverError",
      },
    },
  },
};
