import {
  LoadSurveys,
  LoadSurveysRepository,
} from "./db-load-surveys-protocols";

export class DbLoadSurveys implements LoadSurveys {
  constructor(private readonly _loadSurveysRepository: LoadSurveysRepository) {}

  async load(acocuntId: string): Promise<LoadSurveys.Result> {
    const surveys = await this._loadSurveysRepository.loadAll(acocuntId);
    return surveys;
  }
}
