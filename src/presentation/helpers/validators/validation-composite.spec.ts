import { MissingParamError } from "../../errors"
import { Validation } from "./validation"
import { ValidationComposite } from "./validation-composite"

interface SutTypes {
    sut: ValidationComposite,
    validationStub: Validation
}

const makeValidation = (): Validation => {
    class ValidationCompositeStub implements Validation {
        validate(input: any): Error {
            return new MissingParamError('field')
        }
    }
    return new ValidationCompositeStub()
}

const makeSut = (): SutTypes => {
    const validationStub = makeValidation()
    const sut = new ValidationComposite([validationStub])
    return {
        sut,
        validationStub
    }
}

describe('ValidationComposite', () => {
    test('Should return an error if any validation fails', () => {
        const { sut, validationStub } = makeSut()
        jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new MissingParamError('field'))
        const error = sut.validate({ field: 'any_field' })
        expect(error).toEqual(new MissingParamError('field'))
    })
})