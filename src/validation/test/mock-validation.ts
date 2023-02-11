import { Validation } from "@/presentation/protocols/validation";

export const mockValidation = (): Validation => {
  class ValidationCompositeStub implements Validation {
    validate(input: any): Error {
      return null;
    }
  }
  return new ValidationCompositeStub();
};
