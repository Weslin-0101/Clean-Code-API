import { HttpRequest, HttpResponse, Controller, AddAccount, Validation } from './signup-protocols'
import { badRequest, serverError, ok } from '../../helpers/http/http-helper'

export class SignUpController implements Controller {
  private readonly _addAccount: AddAccount
  private readonly _validation: Validation

  constructor(addAccount: AddAccount, validation: Validation) {
    this._addAccount = addAccount
    this._validation = validation
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this._validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }

      const { name, email, password } = httpRequest.body
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
