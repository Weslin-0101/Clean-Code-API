import { HttpRequest } from "@/presentation/controller/survey/add-survey/add-survey-controller-protocols";
import { AddSurveyController } from "@/presentation/controller/survey/add-survey/add-survey-controller";
import {
  badRequest,
  noContent,
  serverError,
} from "@/presentation/helpers/http/http-helper";
import { ValidationSpy, AddSurveySpy } from "@/tests/presentation/mocks";
import { throwError } from "@/tests/domain/mocks";
import MockDate from "mockdate";
import faker from "faker";

type SutTypes = {
  sut: AddSurveyController;
  validationSpy: ValidationSpy;
  addSurveySpy: AddSurveySpy;
};

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy();
  const addSurveySpy = new AddSurveySpy();
  const sut = new AddSurveyController(validationSpy, addSurveySpy);
  return {
    sut,
    validationSpy,
    addSurveySpy,
  };
};

const mockRequest = (): HttpRequest => ({
  body: {
    question: faker.random.words(),
    answers: [
      {
        image: faker.image.imageUrl(),
        answer: faker.random.word(),
      },
    ],
    date: new Date(),
  },
});

describe("AddSurvey Controller", () => {
  beforeAll(() => {
    MockDate.set(new Date());
  });

  afterAll(() => {
    MockDate.reset();
  });

  test("Should call Validation with correct values", async () => {
    const { sut, validationSpy } = makeSut();
    const httpRequest = mockRequest();
    await sut.handle(httpRequest);
    expect(validationSpy.input).toEqual(httpRequest.body);
  });

  test("Should return 400 if Validation fails", async () => {
    const { sut, validationSpy } = makeSut();
    validationSpy.error = new Error();
    const httpResponse = await sut.handle(mockRequest());
    expect(httpResponse).toEqual(badRequest(validationSpy.error));
  });

  test("Should call AddSurvey with correct values", async () => {
    const { sut, addSurveySpy } = makeSut();
    const httpRequest = mockRequest();
    await sut.handle(httpRequest);
    expect(addSurveySpy.addSurveyParams).toEqual(httpRequest.body);
  });

  test("Should return 500 if AddSurvey throws", async () => {
    const { sut, addSurveySpy } = makeSut();
    jest.spyOn(addSurveySpy, "add").mockImplementationOnce(throwError);
    const httpResponse = await sut.handle(mockRequest());
    expect(httpResponse).toEqual(serverError(new Error()));
  });

  test("Should return 204 on success", async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle(mockRequest());
    expect(httpResponse).toEqual(noContent());
  });
});
