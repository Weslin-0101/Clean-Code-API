import { InvalidParamError } from "@/presentation/errors";
import { CompareFieldsValidation } from "@/validation/validators/compare-fields-validation";
import faker from "faker";

const field = faker.random.word();
const fieldToCompare = faker.random.word();

const makeSut = (): CompareFieldsValidation => {
  return new CompareFieldsValidation(field, fieldToCompare);
};

describe("CompareFields Validation", () => {
  test("Should return an InvalidParamError if validation fails", () => {
    const sut = makeSut();
    const error = sut.validate({
      [field]: "any_field",
      [fieldToCompare]: "other_field",
    });
    expect(error).toEqual(new InvalidParamError(fieldToCompare));
  });

  test("Should no return if validation succeeds", () => {
    const sut = makeSut();
    const value = faker.random.word();
    const error = sut.validate({
      [field]: value,
      [fieldToCompare]: value,
    });
    expect(error).toBeFalsy();
  });
});
