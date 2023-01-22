import { InvalidParamError } from '@/presentation/errors'
import { Validation } from '@/presentation/protocols'
import { EmailValidator } from '@/validation/protocols/emailValidator'

export class EmailValidation implements Validation {
    constructor(
        private readonly _fieldName: string, 
        private readonly _emailValidator: EmailValidator
    ) {}
    
    validate(input: any): Error {
        const isValid = this._emailValidator.isValid(input[this._fieldName])
        if (!isValid) {
            return new InvalidParamError(this._fieldName)
        }
    }
}