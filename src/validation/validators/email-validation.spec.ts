import { EmailValidation } from "./email-validation";
import { EmailValidatorSpy } from "@/validation/test";
import { throwError } from "@/domain/test";
import faker from "faker";
import { InvalidParamError } from "@/presentation/errors";

type SutTypes = {
  sut: EmailValidation;
  emailValidatorSpy: EmailValidatorSpy;
};

const field = faker.random.word();

const makeSut = (): SutTypes => {
  const emailValidatorSpy = new EmailValidatorSpy();
  const sut = new EmailValidation(field, emailValidatorSpy);
  return {
    sut,
    emailValidatorSpy,
  };
};

describe("Email Validation", () => {
  test("Should return an error if EmailValidator returns false", () => {
    const { sut, emailValidatorSpy } = makeSut();
    emailValidatorSpy.isEmailValid = false;
    const email = faker.internet.email();
    const error = sut.validate({ [field]: email });
    expect(error).toEqual(new InvalidParamError(field));
  });

  test("Should call EmailValidator with correct email", () => {
    const { sut, emailValidatorSpy } = makeSut();
    const email = faker.internet.email();
    sut.validate({ [field]: email });
    expect(emailValidatorSpy.email).toBe(email);
  });

  test("Should throw if EmailValidator throws", async () => {
    const { sut, emailValidatorSpy } = makeSut();
    jest.spyOn(emailValidatorSpy, "isValid").mockImplementationOnce(throwError);
    expect(sut.validate).toThrow();
  });
});
