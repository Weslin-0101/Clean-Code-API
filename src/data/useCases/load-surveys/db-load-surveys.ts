import { SurveyModel } from "../../../domain/models/survey";
import { LoadSurveys } from "../../../domain/useCases/load-surveys";
import { LoadSurveysRepository } from "../../protocols/db/survey/load-survey-repository";

export class DbLoadSurveys implements LoadSurveys {
    constructor(
        private readonly _loadSurveysRepository: LoadSurveysRepository
    ) {}
    
    async load(): Promise<SurveyModel[]> {
        await this._loadSurveysRepository.loadAll();
        return []
    }
}