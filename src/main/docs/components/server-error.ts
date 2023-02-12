export const serverError = {
  description: "Erro do servidor",
  content: {
    "application/json": {
      schema: {
        $ref: "#/schemas/error",
      },
    },
  },
};
