import { AddSurveyModel } from '@/domain/useCases/addSurvey'

export interface AddSurveyRepository {
    add(surveyData: AddSurveyModel): Promise<void>
}