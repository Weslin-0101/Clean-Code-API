import {
  CheckSurveyById,
  CheckSurveyByIdRepository,
} from "./db-check-survey-by-id-protocols";

export class DbCheckSurveyById implements CheckSurveyById {
  constructor(
    private readonly _checkSurveyByIdRepository: CheckSurveyByIdRepository
  ) {}

  async checkById(id: string): Promise<CheckSurveyById.Result> {
    return await this._checkSurveyByIdRepository.checkById(id);
  }
}
