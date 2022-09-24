import { Validation } from '../../protocols/validation'

export class ValidationComposite implements Validation {
    private readonly _validation: Validation[]
    
    constructor(validations: Validation[]) {
        this._validation = validations
    }
    
    validate(input: any): Error {
        for (const validation of this._validation) {
            const error = validation.validate(input)
            if (error) {
                return error
            }
        }
    }
}