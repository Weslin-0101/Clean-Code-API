import { InvalidParamError } from '../../errors'
import { Validation } from './validation'

export class CompareFieldsValidation implements Validation {
    private readonly _fieldName: string
    private readonly _compareFieldName: string
    
    constructor(fieldName: string, compareFieldName: string) {
        this._fieldName = fieldName
        this._compareFieldName = compareFieldName
    }
    
    validate(input: any): Error {
        if (input[this._fieldName] !== input[this._compareFieldName]) {
            return new InvalidParamError(this._compareFieldName)
        }
    }
}