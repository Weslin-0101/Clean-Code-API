import { DbLoadSurveyResult } from "./db-load-survye-result";
import { LoadSurveyResultRepository } from "./db-load-survey-result-protocols";
import { mockLoadSurveyResultRepository } from "@/data/test";
import { mockSurveyResultModel, throwError } from "@/domain/test";

type SutTypes = {
  sut: DbLoadSurveyResult;
  loadSurveyResultRepositoryStub: LoadSurveyResultRepository;
};

const makeSut = (): SutTypes => {
  const loadSurveyResultRepositoryStub = mockLoadSurveyResultRepository();
  const sut = new DbLoadSurveyResult(loadSurveyResultRepositoryStub);
  return {
    sut,
    loadSurveyResultRepositoryStub,
  };
};

describe("DbLoadSurveyResult UseCase", () => {
  test("Should call LoadSurveyResultRepository", async () => {
    const { sut, loadSurveyResultRepositoryStub } = makeSut();
    const loadBySurveyIdSpy = jest.spyOn(
      loadSurveyResultRepositoryStub,
      "loadBySurveyId"
    );
    await sut.load("any_survey_id");
    expect(loadBySurveyIdSpy).toHaveBeenCalledWith("any_survey_id");
  });

  test("Should throw if LoadSurveyResultRepository throws", async () => {
    const { sut, loadSurveyResultRepositoryStub } = makeSut();
    jest
      .spyOn(loadSurveyResultRepositoryStub, "loadBySurveyId")
      .mockImplementationOnce(throwError);
    const promise = sut.load("any_survey_id");
    await expect(promise).rejects.toThrow();
  });

  test("Should return surveyResultModel on success", async () => {
    const { sut } = makeSut();
    const surveyResult = await sut.load("any_survey_id");
    expect(surveyResult).toEqual(mockSurveyResultModel());
  });
});