import { MissingParamError } from "@/presentation/errors";
import { RequiredFieldValidation } from "@/validation/validators/required-field-validation";
import faker from "faker";

const field = faker.random.word();

const makeSut = (): RequiredFieldValidation => {
  return new RequiredFieldValidation(field);
};

describe("RequiredFieldValidation", () => {
  test("Should return a MissingParamError if validation fails", () => {
    const sut = makeSut();
    const error = sut.validate({ invalidField: faker.random.word() });
    expect(error).toEqual(new MissingParamError(field));
  });

  test("Should no return if validation succeeds", () => {
    const sut = makeSut();
    const error = sut.validate({ [field]: faker.random.word() });
    expect(error).toBeFalsy();
  });
});
