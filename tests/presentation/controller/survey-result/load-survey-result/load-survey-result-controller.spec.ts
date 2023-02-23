import { LoadSurveyResultController } from "@/presentation/controller/survey-result/load-survey-result/load-survey-result-controller";
import {
  CheckSurveyByIdSpy,
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
  checkSurveyByIdSpy: CheckSurveyByIdSpy;
  loadSurveyResultSpy: LoadSurveyResultSpy;
};

const mockRequest = (): LoadSurveyResultController.Request => ({
  accountId: faker.random.uuid(),
  surveyId: faker.random.uuid(),
});

const makeSut = (): SutTypes => {
  const checkSurveyByIdSpy = new CheckSurveyByIdSpy();
  const loadSurveyResultSpy = new LoadSurveyResultSpy();
  const sut = new LoadSurveyResultController(
    checkSurveyByIdSpy,
    loadSurveyResultSpy
  );
  return {
    sut,
    checkSurveyByIdSpy,
    loadSurveyResultSpy,
  };
};

describe("LoadSurveyResult Controller", () => {
  test("Should call CheckSurveyById with correct value", async () => {
    const { sut, checkSurveyByIdSpy } = makeSut();
    const request = mockRequest();
    await sut.handle(request);
    expect(checkSurveyByIdSpy.id).toBe(request.surveyId);
  });

  test("Should return 403 if CheckSurveyById returns null", async () => {
    const { sut, checkSurveyByIdSpy } = makeSut();
    checkSurveyByIdSpy.result = false;
    const httpResponse = await sut.handle(mockRequest());
    expect(httpResponse).toEqual(forbidden(new InvalidParamError("surveyId")));
  });

  test("Should return 500 if CheckSurveyById throws", async () => {
    const { sut, checkSurveyByIdSpy } = makeSut();
    jest
      .spyOn(checkSurveyByIdSpy, "checkById")
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
    expect(httpResponse).toEqual(ok(loadSurveyResultSpy.result));
  });
});
