import { LoadSurveyByIdRepository } from "@/data/protocols/db/survey/load-survey-by-id-repository";
import { SurveyModel } from "@/domain/models/survey";
import { LoadSurveyById } from "@/domain/useCases/load-survey-by-id";

export class DbLoadSurveyById implements LoadSurveyById {
    constructor(private readonly _loadSurveyByIdRepository: LoadSurveyByIdRepository) {}

    async loadById(id: string): Promise<SurveyModel> {
        await this._loadSurveyByIdRepository.loadById(id)
        return null
    }
}