import { EmailValidation } from "./email-validation";
import { EmailValidator } from "@/validation/protocols/emailValidator";
import { mockEmailValidator } from "@/validation/test";

type SutTypes = {
  sut: EmailValidation;
  emailValidatorStub: EmailValidator;
};

const makeSut = (): SutTypes => {
  const emailValidatorStub = mockEmailValidator();
  const sut = new EmailValidation("email", emailValidatorStub);
  return {
    sut,
    emailValidatorStub,
  };
};

describe("Email Validation", () => {
  test("Should call EmailValidator with correct email", () => {
    const { sut, emailValidatorStub } = makeSut();
    const isValidSpy = jest.spyOn(emailValidatorStub, "isValid");
    sut.validate({ email: "any_email@email.com" });
    expect(isValidSpy).toHaveBeenCalledWith("any_email@email.com");
  });

  test("Should throw if EmailValidator throws", async () => {
    const { sut, emailValidatorStub } = makeSut();
    jest.spyOn(emailValidatorStub, "isValid").mockImplementationOnce(() => {
      throw new Error();
    });
    expect(sut.validate).toThrow();
  });
});
