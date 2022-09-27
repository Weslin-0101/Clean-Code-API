import { badRequest, ok, serverError, unauthorized } from "../../helpers/http/http-helper";
import { Controller, HttpRequest, HttpResponse, Authentication, Validation } from "./login-controller-protocols";

export class LoginController implements Controller {
    constructor(private readonly _authentication: Authentication, private readonly _validation: Validation) {}

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const error = this._validation.validate(httpRequest.body)
            if (error ) {
                return badRequest(error)
            }

            const { email, password } = httpRequest.body
            const accessToken = await this._authentication.auth({ email, password })
            if (!accessToken) return unauthorized()
            return ok({ accessToken })

        } catch (error) {
            return serverError(error)
        }
    }
}