import { LoadSurveysRepository } from "@/data/protocols/db/survey/load-survey-repository";
import {
  AddSurveyParams,
  AddSurveyRepository,
} from "@/data/useCases/survey/add-survey/db-add-survey.protocols";
import { LoadSurveyByIdRepository } from "@/data/useCases/survey/load-survey-by-id/db-load-survey-by-id-protocols";
import { SurveyModel } from "@/domain/models/survey";
import { ObjectId } from "mongodb";
import { MongoHelper } from "../helpes/mongo-helper";

export class SurveyMongoRepository
  implements
    AddSurveyRepository,
    LoadSurveysRepository,
    LoadSurveyByIdRepository
{
  async add(data: AddSurveyParams): Promise<void> {
    const surveyCollection = await MongoHelper.getCollection("surveys");
    await surveyCollection.insertOne(data);
  }

  async loadAll(): Promise<SurveyModel[]> {
    const surveyCollection = await MongoHelper.getCollection("surveys");
    const surveys = await surveyCollection.find().toArray();
    return MongoHelper.mapCollection(surveys);
  }

  async loadById(id: string): Promise<SurveyModel> {
    const surveyCollection = await MongoHelper.getCollection("surveys");
    const survey = await surveyCollection.findOne({ _id: new ObjectId(id) });
    return MongoHelper.map(survey) || null;
  }
}
