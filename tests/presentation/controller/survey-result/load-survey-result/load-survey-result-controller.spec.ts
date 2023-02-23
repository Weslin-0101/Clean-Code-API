import { LoadSurveyResultController } from "@/presentation/controller/survey-result/load-survey-result/load-survey-result-controller";
import {
  LoadSurveyByIdSpy,
  LoadSurveyResultSpy,
} from "@/tests/presentation/mocks";
import {
  forbidden,
  ok,
  serverError,
} from "@/presentation/helpers/http/http-helper";
import { InvalidParamError } from "@/presentation/errors";
import { throwError } from "@/tests/domain/mocks";
import faker from "faker";

type SutTypes = {
  sut: LoadSurveyResultController;
  loadSurveyByIdSpy: LoadSurveyByIdSpy;
  loadSurveyResultSpy: LoadSurveyResultSpy;
};

const mockRequest = (): LoadSurveyResultController.Request => ({
  accountId: faker.random.uuid(),
  surveyId: faker.random.uuid(),
});

const makeSut = (): SutTypes => {
  const loadSurveyByIdSpy = new LoadSurveyByIdSpy();
  const loadSurveyResultSpy = new LoadSurveyResultSpy();
  const sut = new LoadSurveyResultController(
    loadSurveyByIdSpy,
    loadSurveyResultSpy
  );
  return {
    sut,
    loadSurveyByIdSpy,
    loadSurveyResultSpy,
  };
};

describe("LoadSurveyResult Controller", () => {
  test("Should call LoadSurveyById with correct value", async () => {
    const { sut, loadSurveyByIdSpy } = makeSut();
    const request = mockRequest();
    await sut.handle(request);
    expect(loadSurveyByIdSpy.id).toBe(request.surveyId);
  });

  test("Should return 403 if LoadSurveyById returns null", async () => {
    const { sut, loadSurveyByIdSpy } = makeSut();
    loadSurveyByIdSpy.surveyModel = null;
    const httpResponse = await sut.handle(mockRequest());
    expect(httpResponse).toEqual(forbidden(new InvalidParamError("surveyId")));
  });

  test("Should return 500 if LoadSurveyById throws", async () => {
    const { sut, loadSurveyByIdSpy } = makeSut();
    jest
      .spyOn(loadSurveyByIdSpy, "loadById")
      .mockImplementationOnce(throwError);
    const httpResponse = await sut.handle(mockRequest());
    expect(httpResponse).toEqual(serverError(new Error()));
  });

  test("Should call LoadSurveyResult with correct values", async () => {
    const { sut, loadSurveyResultSpy } = makeSut();
    const request = mockRequest();
    await sut.handle(request);
    expect(loadSurveyResultSpy.surveyId).toBe(request.surveyId);
    expect(loadSurveyResultSpy.accountId).toBe(request.accountId);
  });

  test("Should return 500 if LoadSurveyResult throws", async () => {
    const { sut, loadSurveyResultSpy } = makeSut();
    jest.spyOn(loadSurveyResultSpy, "load").mockImplementationOnce(throwError);
    const httpResponse = await sut.handle(mockRequest());
    expect(httpResponse).toEqual(serverError(new Error()));
  });

  test("Should return 200 on success", async () => {
    const { sut, loadSurveyResultSpy } = makeSut();
    const httpResponse = await sut.handle(mockRequest());
    expect(httpResponse).toEqual(ok(loadSurveyResultSpy.surveyResultModel));
  });
});