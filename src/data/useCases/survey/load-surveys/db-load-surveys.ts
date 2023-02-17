import {
  SurveyModel,
  LoadSurveys,
  LoadSurveysRepository,
} from "./db-load-surveys-protocols";

export class DbLoadSurveys implements LoadSurveys {
  constructor(private readonly _loadSurveysRepository: LoadSurveysRepository) {}

  async load(acocuntId: string): Promise<SurveyModel[]> {
    const surveys = await this._loadSurveysRepository.loadAll(acocuntId);
    return surveys;
  }
}
