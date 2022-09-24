import { MissingParamError } from "../../errors"
import { Validation } from "./validation"
import { ValidationComposite } from "./validation-composite"

describe('ValidationComposite', () => {
    test('Should return an error if any validation fails', () => {
        class ValidationCompositeStub implements Validation {
            validate(input: any): Error {
                return new MissingParamError('field')
            }
        }
        const validationCompositeStub = new ValidationCompositeStub()
        const sut = new ValidationComposite([validationCompositeStub])
        const error = sut.validate({ field: 'any_field' })
        expect(error).toEqual(new MissingParamError('field'))
    })
})