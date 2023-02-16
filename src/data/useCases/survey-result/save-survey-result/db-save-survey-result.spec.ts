import { DbSaveSurveyResult } from "./db-save-survey-result";
import { LoadSurveyResultRepository } from "../../load-survey-result/db-load-survey-result-protocols";
import { SaveSurveyResultRepository } from "./db-save-survey-result-protocols";
import {
  mockLoadSurveyResultRepository,
  mockSaveSurveyResultRepository,
} from "@/data/test";
import {
  throwError,
  mockSurveyResultModel,
  mockFakeSurveyResultData,
} from "@/domain/test";
import MockDate from "mockdate";

type SutTypes = {
  sut: DbSaveSurveyResult;
  saveSurveyResultRepositoryStub: SaveSurveyResultRepository;
  loadSurveyResultRepositoryStub: LoadSurveyResultRepository;
};

const makeSut = (): SutTypes => {
  const saveSurveyResultRepositoryStub = mockSaveSurveyResultRepository();
  const loadSurveyResultRepositoryStub = mockLoadSurveyResultRepository();
  const sut = new DbSaveSurveyResult(
    saveSurveyResultRepositoryStub,
    loadSurveyResultRepositoryStub
  );
  return {
    sut,
    saveSurveyResultRepositoryStub,
    loadSurveyResultRepositoryStub,
  };
};

describe("DbSaveSurveyResult UseCase", () => {
  beforeAll(() => {
    MockDate.set(new Date());
  });

  afterAll(() => {
    MockDate.reset();
  });

  test("Should call SaveSurveyResultRepository with correct values", async () => {
    const { sut, saveSurveyResultRepositoryStub } = makeSut();
    const saveSpy = jest.spyOn(saveSurveyResultRepositoryStub, "save");
    const surveyResultData = mockFakeSurveyResultData();
    await sut.save(surveyResultData);
    expect(saveSpy).toHaveBeenCalledWith(surveyResultData);
  });

  test("Should throw if SaveSurveyResultRepository throws", async () => {
    const { sut, saveSurveyResultRepositoryStub } = makeSut();
    jest
      .spyOn(saveSurveyResultRepositoryStub, "save")
      .mockImplementationOnce(throwError);
    const promise = sut.save(mockFakeSurveyResultData());
    await expect(promise).rejects.toThrow();
  });

  test("Should call LoadSurveyResultRepository with correct values", async () => {
    const { sut, loadSurveyResultRepositoryStub } = makeSut();
    const loadBySurveyIdSpy = jest.spyOn(
      loadSurveyResultRepositoryStub,
      "loadBySurveyId"
    );
    const surveyResultData = mockFakeSurveyResultData();
    await sut.save(surveyResultData);
    expect(loadBySurveyIdSpy).toHaveBeenCalledWith(surveyResultData.surveyId);
  });

  test("Should throw if SaveSurveyResultRepository throws", async () => {
    const { sut, loadSurveyResultRepositoryStub } = makeSut();
    jest
      .spyOn(loadSurveyResultRepositoryStub, "loadBySurveyId")
      .mockImplementationOnce(throwError);
    const promise = sut.save(mockFakeSurveyResultData());
    await expect(promise).rejects.toThrow();
  });

  test("Should return SurveyResult on success", async () => {
    const { sut } = makeSut();
    const surveyResult = await sut.save(mockFakeSurveyResultData());
    expect(surveyResult).toEqual(mockSurveyResultModel());
  });
});
