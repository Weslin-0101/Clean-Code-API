import { DbCheckSurveyById } from "@/data/useCases/survey/check-survey-by-id/db-check-survey-by-id";
import { throwError } from "@/tests/domain/mocks";
import { CheckSurveyByIdRepositorySpy } from "@/tests/database/mocks";
import faker from "faker";

type SutTypes = {
  sut: DbCheckSurveyById;
  checkSurveyByIdRepositorySpy: CheckSurveyByIdRepositorySpy;
};

const makeSut = (): SutTypes => {
  const checkSurveyByIdRepositorySpy = new CheckSurveyByIdRepositorySpy();
  const sut = new DbCheckSurveyById(checkSurveyByIdRepositorySpy);
  return {
    sut,
    checkSurveyByIdRepositorySpy,
  };
};

let surveyId: string;

describe("DbCheckSurveyById", () => {
  beforeEach(() => {
    surveyId = faker.random.uuid();
  });

  test("Should call CheckSurveyByIdRepository", async () => {
    const { sut, checkSurveyByIdRepositorySpy } = makeSut();
    await sut.checkById(surveyId);
    expect(checkSurveyByIdRepositorySpy.id).toBe(surveyId);
  });

  test("Should return true if checkSurveyById returns true", async () => {
    const { sut } = makeSut();
    const exists = await sut.checkById(surveyId);
    expect(exists).toBe(true);
  });

  test("Should return false if checkSurveyById returns false", async () => {
    const { sut, checkSurveyByIdRepositorySpy } = makeSut();
    checkSurveyByIdRepositorySpy.result = false;
    const exists = await sut.checkById(surveyId);
    expect(exists).toBe(false);
  });

  test("Should throw if CheckSurveyByIdRepository throws", async () => {
    const { sut, checkSurveyByIdRepositorySpy } = makeSut();
    jest
      .spyOn(checkSurveyByIdRepositorySpy, "checkById")
      .mockImplementationOnce(throwError);
    const promise = sut.checkById(surveyId);
    await expect(promise).rejects.toThrow();
  });
});
