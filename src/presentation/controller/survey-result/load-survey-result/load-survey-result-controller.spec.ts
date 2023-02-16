import { LoadSurveyResultController } from "./load-survey-result-controller";
import { HttpRequest } from "./load-survye-result-controller-protocols";
import { mockLoadSurveyById } from "@/presentation/test";

const mockFakeRequest = (): HttpRequest => ({
  params: {
    surveyId: "any_id",
  },
});

describe("LoadSurveyResult Controller", () => {
  test("Should call LoadSurveyById with correct value", async () => {
    const loadSurveyByIdStub = mockLoadSurveyById();
    const sut = new LoadSurveyResultController(loadSurveyByIdStub);
    const loadByIdSpy = jest.spyOn(loadSurveyByIdStub, "loadById");
    await sut.handle(mockFakeRequest());
    expect(loadByIdSpy).toHaveBeenCalledWith("any_id");
  });
});
