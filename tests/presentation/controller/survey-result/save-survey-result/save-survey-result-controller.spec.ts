import { InvalidParamError } from "@/presentation/errors";
import {
  forbidden,
  ok,
  serverError,
} from "@/presentation/helpers/http/http-helper";
import { SaveSurveyResultController } from "@/presentation/controller/survey-result/save-survey-result/save-survey-result-controller";
import {
  SaveSurveyResultSpy,
  LoadAnswersBySurveySpy,
} from "@/tests/presentation/mocks";
import { throwError } from "@/tests/domain/mocks";
import MockDate from "mockdate";
import faker from "faker";

export type SutTypes = {
  sut: SaveSurveyResultController;
  loadAnswersBySurveySpy: LoadAnswersBySurveySpy;
  saveSurveyResultSpy: SaveSurveyResultSpy;
};

const mockRequest = (
  answer: string = null
): SaveSurveyResultController.Request => ({
  surveyId: faker.random.uuid(),
  answer,
  accountId: faker.random.uuid(),
});

const makeSut = (): SutTypes => {
  const loadAnswersBySurveySpy = new LoadAnswersBySurveySpy();
  const saveSurveyResultSpy = new SaveSurveyResultSpy();
  const sut = new SaveSurveyResultController(
    loadAnswersBySurveySpy,
    saveSurveyResultSpy
  );
  return {
    sut,
    loadAnswersBySurveySpy,
    saveSurveyResultSpy,
  };
};

describe("SaveSurveyResult Controller", () => {
  beforeAll(() => {
    MockDate.set(new Date());
  });

  afterAll(() => {
    MockDate.reset();
  });

  test("Should call LoadAnswersBySurvey with correct values", async () => {
    const { sut, loadAnswersBySurveySpy } = makeSut();
    const request = mockRequest();
    await sut.handle(request);
    expect(loadAnswersBySurveySpy.id).toBe(request.surveyId);
  });

  test("Should return 403 if LoadAnswersBySurvey returns null", async () => {
    const { sut, loadAnswersBySurveySpy } = makeSut();
    loadAnswersBySurveySpy.result = [];
    const httpResponse = await sut.handle(mockRequest());
    expect(httpResponse).toEqual(forbidden(new InvalidParamError("surveyId")));
  });

  // Arrumar esse bug: Este teste interfere no teste 500 da classe
  // DbSaveSurveyResult

  test("Should return 500 if LoadAnswersBySurvey throws", async () => {
    const { sut, loadAnswersBySurveySpy } = makeSut();
    jest
      .spyOn(loadAnswersBySurveySpy, "loadAnswers")
      .mockImplementationOnce(throwError);
    const httpResponse = await sut.handle(mockRequest());
    expect(httpResponse).toEqual(serverError(new Error()));
  });

  test("Should return 403 if an invalid answer is provided", async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle(mockRequest());
    expect(httpResponse).toEqual(forbidden(new InvalidParamError("answer")));
  });

  test("Should call SaveSurveyResult with correct values", async () => {
    const { sut, saveSurveyResultSpy, loadAnswersBySurveySpy } = makeSut();
    const request = mockRequest(loadAnswersBySurveySpy.result[0]);
    await sut.handle(request);
    expect(saveSurveyResultSpy.saveSurveyResultParams).toEqual({
      surveyId: request.surveyId,
      accountId: request.accountId,
      date: new Date(),
      answer: request.answer,
    });
  });

  test("Should return 500 if SaveSurveyResult throws", async () => {
    const { sut, saveSurveyResultSpy, loadAnswersBySurveySpy } = makeSut();
    jest.spyOn(saveSurveyResultSpy, "save").mockImplementationOnce(throwError);
    const request = mockRequest(loadAnswersBySurveySpy.result[0]);
    const httpResponse = await sut.handle(request);
    expect(httpResponse).toEqual(serverError(new Error()));
  });

  test("Should return 200 on success", async () => {
    const { sut, saveSurveyResultSpy, loadAnswersBySurveySpy } = makeSut();
    const request = mockRequest(loadAnswersBySurveySpy.result[0]);
    const httpResponse = await sut.handle(request);
    expect(httpResponse).toEqual(ok(saveSurveyResultSpy.result));
  });
});
