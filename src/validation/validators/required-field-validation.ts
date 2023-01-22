import { MissingParamError } from '@/presentation/errors'
import { Validation } from '@/presentation/protocols'

export class RequiredFieldValidation implements Validation {
    constructor(private readonly _fieldName: string) {}
    
    validate(input: any): Error {
        if (!input[this._fieldName]) {
            return new MissingParamError(this._fieldName)
        }
    }
}