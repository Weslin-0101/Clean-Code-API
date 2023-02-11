import { throwError } from "@/domain/test";
import bcrypt from "bcrypt";
import { BcryptAdapter } from "./bcrypt.adapter";

jest.mock("bcrypt", () => ({
  async hash(): Promise<string> {
    return Promise.resolve("hashed_value");
  },

  async compare(): Promise<boolean> {
    return Promise.resolve(true);
  },
}));

const salt = 12;
const makeSut = (): BcryptAdapter => {
  return new BcryptAdapter(salt);
};

describe("Bcrypt Adapter", () => {
  test("should call hash with correct values", async () => {
    const sut = makeSut();
    const hashSpy = jest.spyOn(bcrypt, "hash");
    sut.hash("any_value");
    expect(hashSpy).toHaveBeenCalledWith("any_value", salt);
  });

  test("should return a valid hash on hash success", async () => {
    const sut = makeSut();
    const hash = await sut.hash("any_value");
    expect(hash).toBe("hashed_value");
  });

  test("should throw if bcrypt thorws", async () => {
    const sut = makeSut();
    jest.spyOn(bcrypt, "hash").mockImplementationOnce(throwError);
    const promise = sut.hash("any_value");
    await expect(promise).rejects.toThrow();
  });

  test("should call compare with correct values", async () => {
    const sut = makeSut();
    const compareSpy = jest.spyOn(bcrypt, "compare");
    sut.compare("any_value", "any_hash");
    expect(compareSpy).toHaveBeenCalledWith("any_value", "any_hash");
  });

  test("should return true when compare succeeds", async () => {
    const sut = makeSut();
    const isValid = await sut.compare("any_value", "any_hash");
    expect(isValid).toBe(true);
  });
});
