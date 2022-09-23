import { HttpRequest, HttpResponse, Controller, EmailValidator, AddAccount, Validation } from './signup-protocols'
import { MissingParamError, InvalidParamError } from '../../errors'
import { badRequest, serverError, ok } from '../../helpers/http-helper'

export class SignUpController implements Controller {
  private readonly _emailValidator: EmailValidator
  private readonly _addAccount: AddAccount
  private readonly _validation: Validation

  constructor(emailValidator: EmailValidator, addAccount: AddAccount, validation: Validation) {
    this._emailValidator = emailValidator
    this._addAccount = addAccount
    this._validation = validation
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      this._validation.validate(httpRequest.body)

      const requiredField = ['name', 'email', 'password', 'passwordConfirmation']
      for (const field of requiredField) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }

      const { name, email, password, passwordConfirmation } = httpRequest.body

      if (password !== passwordConfirmation) {
        return badRequest(new InvalidParamError('passwordConfirmation'))
      }

      const isValid = this._emailValidator.isValid(email)
      if (!isValid) {
        return badRequest(new InvalidParamError('email'))
      }
      const account = await this._addAccount.add({
        name,
        email,
        password
      })
  
      return ok(account)

    } catch (error) {
      return serverError(error)
    }
  }
}
