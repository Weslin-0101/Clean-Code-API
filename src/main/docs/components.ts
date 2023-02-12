import {
  badRequest,
  serverError,
  unauthorized,
  notFound,
  success,
  forbidden,
} from "@/main/docs/components/";
import { apiKeyAuthSchema } from "@/main/docs/schemas/";

export default {
  securitySchemes: {
    apiKeyAuth: apiKeyAuthSchema,
  },
  success,
  badRequest,
  serverError,
  unauthorized,
  notFound,
  forbidden,
};
