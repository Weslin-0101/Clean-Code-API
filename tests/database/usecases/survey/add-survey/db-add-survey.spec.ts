import { DbAddSurvey } from "@/data/useCases/survey/add-survey/db-add-survey";
import { AddSurveyRepositorySpy } from "@/tests/database/mocks";
import { mockAddSurveyParams, throwError } from "@/tests/domain/mocks";
import MockDate from "mockdate";

type SutTypes = {
  sut: DbAddSurvey;
  addSurveyRepositorySpy: AddSurveyRepositorySpy;
};

const makeSut = (): SutTypes => {
  const addSurveyRepositorySpy = new AddSurveyRepositorySpy();
  const sut = new DbAddSurvey(addSurveyRepositorySpy);
  return {
    sut,
    addSurveyRepositorySpy,
  };
};

describe("DbAddSurvey UseCase", () => {
  beforeAll(() => {
    MockDate.set(new Date());
  });

  afterAll(() => {
    MockDate.reset();
  });

  test("Should call AddSurveyRepository with correct values", async () => {
    const { sut, addSurveyRepositorySpy } = makeSut();
    const surveyData = mockAddSurveyParams();
    await sut.add(surveyData);
    expect(addSurveyRepositorySpy.addSurveyParams).toEqual(surveyData);
  });

  test("Should throw if AddSurveyRepository throws", async () => {
    const { sut, addSurveyRepositorySpy } = makeSut();
    jest
      .spyOn(addSurveyRepositorySpy, "add")
      .mockImplementationOnce(throwError);
    const promise = sut.add(mockAddSurveyParams());
    await expect(promise).rejects.toThrow();
  });
});
