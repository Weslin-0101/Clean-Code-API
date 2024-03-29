import { AddSurvey, AddSurveyRepository } from "./db-add-survey.protocols";

export class DbAddSurvey implements AddSurvey {
  constructor(private readonly _addSurveyRepository: AddSurveyRepository) {}

  async add(data: AddSurvey.Params): Promise<void> {
    await this._addSurveyRepository.add(data);
  }
}
