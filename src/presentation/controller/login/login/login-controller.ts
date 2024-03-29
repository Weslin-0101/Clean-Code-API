import {
  badRequest,
  ok,
  serverError,
  unauthorized,
} from "@/presentation/helpers/http/http-helper";
import {
  Controller,
  HttpResponse,
  Authentication,
  Validation,
} from "./login-controller-protocols";

export class LoginController implements Controller {
  constructor(
    private readonly _authentication: Authentication,
    private readonly _validation: Validation
  ) {}

  async handle(request: LoginController.Request): Promise<HttpResponse> {
    try {
      const error = this._validation.validate(request);
      if (error) {
        return badRequest(error);
      }

      const { email, password } = request;
      const authenticationModel = await this._authentication.auth({
        email,
        password,
      });
      if (!authenticationModel) return unauthorized();
      return ok(authenticationModel);
    } catch (error) {
      return serverError(error);
    }
  }
}

export namespace LoginController {
  export type Request = {
    email: string;
    password: string;
  };
}
