import { DbAuthentication } from "./db-authentication";
import {
  AccountModel,
  LoadAccountByEmailRepository,
  AuthenticationParams,
  HashComparer,
  Encrypter,
  UpdateAccessTokenRepository,
} from "./db-authentication-protocols";
import {
  mockAccountModel,
  mockAddAccoutParams,
  throwError,
} from "@/domain/test";

type SutTypes = {
  sut: DbAuthentication;
  loadAccountByEmailRepositoryStub: LoadAccountByEmailRepository;
  hashComparerStub: HashComparer;
  encrypterStub: Encrypter;
  updateAccessTokenRepositoryStub: UpdateAccessTokenRepository;
};

const makeFakeAccount = (): AccountModel => ({
  id: "any_id",
  name: "any_name",
  email: "any_email",
  password: "hashed_password",
});

const makeFakeAuthentication = (): AuthenticationParams => ({
  email: "any_email",
  password: "any_password",
});

const makeLoadAccountByEmailRepository = (): LoadAccountByEmailRepository => {
  class LoadAccountByEmailRepositoryStub
    implements LoadAccountByEmailRepository
  {
    async loadByEmail(email: string): Promise<AccountModel> {
      return new Promise((resolve) => resolve(makeFakeAccount()));
    }
  }

  return new LoadAccountByEmailRepositoryStub();
};

const makeHashComparer = (): HashComparer => {
  class HashComparerStub implements HashComparer {
    async compare(value: string, hash: string): Promise<boolean> {
      return new Promise((resolve) => resolve(true));
    }
  }
  return new HashComparerStub();
};

const makeEncrypter = (): Encrypter => {
  class encrypterStub implements Encrypter {
    encrypt(value: string): Promise<string> {
      return new Promise((resolve) => resolve("any_token"));
    }
  }
  return new encrypterStub();
};

const makeUpdateAccessTokenRepository = (): UpdateAccessTokenRepository => {
  class UpdateAccessTokenRepositoryStub implements UpdateAccessTokenRepository {
    async updateAccessToken(id: string, token: string): Promise<void> {
      return new Promise((resolve) => resolve());
    }
  }
  return new UpdateAccessTokenRepositoryStub();
};

const makeSut = (): SutTypes => {
  const loadAccountByEmailRepositoryStub = makeLoadAccountByEmailRepository();
  const hashComparerStub = makeHashComparer();
  const encrypterStub = makeEncrypter();
  const updateAccessTokenRepositoryStub = makeUpdateAccessTokenRepository();
  const sut = new DbAuthentication(
    loadAccountByEmailRepositoryStub,
    hashComparerStub,
    encrypterStub,
    updateAccessTokenRepositoryStub
  );
  return {
    sut,
    loadAccountByEmailRepositoryStub,
    hashComparerStub,
    encrypterStub,
    updateAccessTokenRepositoryStub,
  };
};

describe("DbAuthentication UseCase", () => {
  test("Should call LoadAccountByEmailRepository with correct email", async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut();
    const loadSpy = jest.spyOn(loadAccountByEmailRepositoryStub, "loadByEmail");
    await sut.auth(makeFakeAuthentication());
    expect(loadSpy).toHaveBeenCalledWith("any_email");
  });

  test("Should throw if LoadAccountByEmailRepository throws", async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut();
    jest
      .spyOn(loadAccountByEmailRepositoryStub, "loadByEmail")
      .mockImplementationOnce(throwError);
    const promise = sut.auth(makeFakeAuthentication());
    await expect(promise).rejects.toThrow();
  });

  test("Should return null if LoadAccountByEmailRepository retuns null", async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut();
    jest
      .spyOn(loadAccountByEmailRepositoryStub, "loadByEmail")
      .mockReturnValue(null);
    const accessToken = await sut.auth(makeFakeAuthentication());
    expect(accessToken).toBeNull();
  });

  test("Should call HashComparer if correct values", async () => {
    const { sut, hashComparerStub } = makeSut();
    const compareSpy = jest.spyOn(hashComparerStub, "compare");
    await sut.auth(makeFakeAuthentication());
    expect(compareSpy).toHaveBeenCalledWith("any_password", "hashed_password");
  });

  test("Should throw if HashComparer throws", async () => {
    const { sut, hashComparerStub } = makeSut();
    jest.spyOn(hashComparerStub, "compare").mockImplementationOnce(throwError);
    const promise = sut.auth(makeFakeAuthentication());
    await expect(promise).rejects.toThrow();
  });

  test("Should return null if HashComparer retuns false", async () => {
    const { sut, hashComparerStub } = makeSut();
    jest
      .spyOn(hashComparerStub, "compare")
      .mockReturnValueOnce(new Promise((resolve) => resolve(false)));
    const accessToken = await sut.auth(makeFakeAuthentication());
    expect(accessToken).toBeNull();
  });

  test("Should call Encrypter if correct id", async () => {
    const { sut, encrypterStub } = makeSut();
    const encrypterSpy = jest.spyOn(encrypterStub, "encrypt");
    await sut.auth(makeFakeAuthentication());
    expect(encrypterSpy).toHaveBeenCalledWith("any_id");
  });

  test("Should throw if Encrypter throws", async () => {
    const { sut, encrypterStub } = makeSut();
    jest.spyOn(encrypterStub, "encrypt").mockImplementationOnce(throwError);
    const promise = sut.auth(makeFakeAuthentication());
    await expect(promise).rejects.toThrow();
  });

  test("Should returns a token on success", async () => {
    const { sut } = makeSut();
    const accessToken = await sut.auth(makeFakeAuthentication());
    expect(accessToken).toBe("any_token");
  });

  test("Should call UpdateAccessTokenRepository if correct values", async () => {
    const { sut, updateAccessTokenRepositoryStub } = makeSut();
    const updateAccessTokenRepositorySpy = jest.spyOn(
      updateAccessTokenRepositoryStub,
      "updateAccessToken"
    );
    await sut.auth(makeFakeAuthentication());
    expect(updateAccessTokenRepositorySpy).toHaveBeenCalledWith(
      "any_id",
      "any_token"
    );
  });

  test("Should throw if UpdateAccessTokenRepository throws", async () => {
    const { sut, updateAccessTokenRepositoryStub } = makeSut();
    jest
      .spyOn(updateAccessTokenRepositoryStub, "updateAccessToken")
      .mockImplementationOnce(throwError);
    const promise = sut.auth(makeFakeAuthentication());
    await expect(promise).rejects.toThrow();
  });
});
