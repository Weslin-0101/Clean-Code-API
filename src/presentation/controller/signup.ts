import { HttpRequest, HttpResponse } from '../protocols/http'
import { MissingParamError } from '../error/missing-params.error'
import { badRequest } from '../helpers/http-helper'
import { Controller } from '../protocols/controller'
import { EmailValidator } from '../protocols/emailValidator'
import { InvalidParamError } from '../error/invalid-params.error'
import { ServerError } from '../error/server.error'

export class SignUpController implements Controller {
  private readonly _emailValidator: EmailValidator

  constructor(emailValidator: EmailValidator) {
    this._emailValidator = emailValidator
  }

  handle (httpRequest: HttpRequest): HttpResponse {
    try {
      const requiredField = ['name', 'email', 'password', 'passwordConfirmation']
      for (const field of requiredField) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }
      const isValid = this._emailValidator.isValid(httpRequest.body.email)
      if (!isValid) {
        return badRequest(new InvalidParamError('email'))
      }
  
      return {
        statusCode: 200,
        body: {
          message: 'OK'
        }
      }
    } catch (error) {
      return {
        statusCode: 500,
        body: new ServerError()
      }
    }
  }
}
