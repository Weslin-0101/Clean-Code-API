import { HttpRequest, HttpResponse, Controller, EmailValidator } from '../protocols'
import { MissingParamError, InvalidParamError } from '../errors'
import { badRequest, serverError } from '../helpers/http-helper'

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

      const { email, password, passwordConfirmation } = httpRequest.body

      if (password !== passwordConfirmation) {
        return badRequest(new InvalidParamError('passwordConfirmation'))
      }

      const isValid = this._emailValidator.isValid(email)
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
      return serverError()
    }
  }
}
