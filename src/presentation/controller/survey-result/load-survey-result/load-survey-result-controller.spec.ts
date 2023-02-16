import { LoadSurveyResultController } from "./load-survey-result-controller";
import {
  HttpRequest,
  LoadSurveyById,
} from "./load-survye-result-controller-protocols";
import { mockLoadSurveyById } from "@/presentation/test";

type SutTypes = {
  sut: LoadSurveyResultController;
  loadSurveyByIdStub: LoadSurveyById;
};

const mockFakeRequest = (): HttpRequest => ({
  params: {
    surveyId: "any_id",
  },
});

const makeSut = (): SutTypes => {
  const loadSurveyByIdStub = mockLoadSurveyById();
  const sut = new LoadSurveyResultController(loadSurveyByIdStub);
  return {
    sut,
    loadSurveyByIdStub,
  };
};

describe("LoadSurveyResult Controller", () => {
  test("Should call LoadSurveyById with correct value", async () => {
    const { sut, loadSurveyByIdStub } = makeSut();
    const loadByIdSpy = jest.spyOn(loadSurveyByIdStub, "loadById");
    await sut.handle(mockFakeRequest());
    expect(loadByIdSpy).toHaveBeenCalledWith("any_id");
  });
});
