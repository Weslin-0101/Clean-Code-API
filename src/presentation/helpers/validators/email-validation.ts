import { InvalidParamError } from '../../errors'
import { EmailValidator } from '../../protocols/emailValidator'
import { Validation } from '../../protocols/validation'

export class EmailValidation implements Validation {
    private readonly _fieldName: string
    private readonly _emailValidator: EmailValidator
    
    constructor(fieldName: string, emailValidator: EmailValidator) {
        this._fieldName = fieldName
        this._emailValidator = emailValidator
    }
    
    validate(input: any): Error {
        const isValid = this._emailValidator.isValid(input[this._fieldName])
        if (!isValid) {
            return new InvalidParamError(this._fieldName)
        }
    }
}