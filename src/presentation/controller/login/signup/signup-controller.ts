import {
  HttpResponse,
  Controller,
  AddAccount,
  Validation,
  Authentication,
} from "./signup-controller-protocols";
import {
  badRequest,
  serverError,
  ok,
  forbidden,
} from "../../../helpers/http/http-helper";
import { EmailInUseError } from "../../../errors";

export class SignUpController implements Controller {
  constructor(
    private readonly _addAccount: AddAccount,
    private readonly _validation: Validation,
    private readonly _authentication: Authentication
  ) {}

  async handle(request: SignUpController.Request): Promise<HttpResponse> {
    try {
      const error = this._validation.validate(request);
      if (error) {
        return badRequest(error);
      }

      const { name, email, password } = request;
      const isValid = await this._addAccount.add({
        name,
        email,
        password,
      });

      if (!isValid) return forbidden(new EmailInUseError());

      const authenticationModel = await this._authentication.auth({
        email,
        password,
      });

      return ok(authenticationModel);
    } catch (error) {
      return serverError(error);
    }
  }
}

export namespace SignUpController {
  export type Request = {
    name: string;
    email: string;
    password: string;
    passwordConfirmation: string;
  };
}
