import {
  EmailValidation,
  RequiredFieldValidation,
  ValidationComposite,
} from "@/validation/validators";
import { EmailValidatorAdapter } from "@/infra/validators/email-validator-adapter";
import { makeLoginValidation } from "@/main/factories/controllers/login/login-validation-factory";
import { Validation } from "@/presentation/protocols/validation";

jest.mock("@/validation/validators/validation-composite");

describe("LoginValidation Factory", () => {
  test("Should call ValidationComposite with all validations", () => {
    makeLoginValidation();
    const validations: Validation[] = [];
    for (const field of ["email", "password"]) {
      validations.push(new RequiredFieldValidation(field));
    }
    validations.push(new EmailValidation("email", new EmailValidatorAdapter()));
    expect(ValidationComposite).toHaveBeenCalledWith(validations);
  });
});
