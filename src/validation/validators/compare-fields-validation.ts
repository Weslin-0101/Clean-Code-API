import { InvalidParamError } from '../../presentation/errors'
import { Validation } from '../../presentation/protocols'

export class CompareFieldsValidation implements Validation {
    
    constructor(
        private readonly _fieldName: string, 
        private readonly _compareFieldName: string
    ) {}
    
    validate(input: any): Error {
        if (input[this._fieldName] !== input[this._compareFieldName]) {
            return new InvalidParamError(this._compareFieldName)
        }
    }
}