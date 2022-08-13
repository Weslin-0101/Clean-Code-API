import { HttpRequest, HttpResponse } from '../protocols/http'
import { MissingParamError } from '../error/missing-params.error'
import { badRequest } from '../helpers/http-helper'
export class SignUpController {
  handle (httpRequest: HttpRequest): HttpResponse {
    const requiredField = ['name', 'email', 'password', 'passwordConfirmation']
    for (const field of requiredField) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field))
      }
    }

    return {
      statusCode: 200,
      body: {
        message: 'OK'
      }
    }
  }
}
