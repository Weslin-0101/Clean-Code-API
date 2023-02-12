export const signUpPath = {
  post: {
    tags: ["Login"],
    summary: "API para criar conta de usuário",
    requestBody: {
      content: {
        "application/json": {
          schema: {
            $ref: "#/schemas/signUpParams",
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
      403: {
        $ref: "#/components/forbidden",
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
