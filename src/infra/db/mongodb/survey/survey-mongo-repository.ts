import { CheckSurveyByIdRepository } from "@/data/protocols/db/survey/check-survey-by-id-repository";
import { LoadSurveysRepository } from "@/data/protocols/db/survey/load-survey-repository";
import { AddSurveyRepository } from "@/data/useCases/survey/add-survey/db-add-survey.protocols";
import { LoadSurveyByIdRepository } from "@/data/protocols/db/survey/load-survey-by-id-repository";
import { LoadAnswersBySurveyRepository } from "@/data/protocols/db/survey/load-answers-by-survey-repository";
import { MongoHelper, QueryBuilder } from "../helpes";
import { ObjectId } from "mongodb";

export class SurveyMongoRepository
  implements
    AddSurveyRepository,
    LoadSurveysRepository,
    CheckSurveyByIdRepository,
    LoadAnswersBySurveyRepository
{
  async add(data: AddSurveyRepository.Params): Promise<void> {
    const surveyCollection = MongoHelper.getCollection("surveys");
    await surveyCollection.insertOne(data);
  }

  async loadAll(accountId: string): Promise<LoadSurveysRepository.Result> {
    const surveyCollection = MongoHelper.getCollection("surveys");
    const query = new QueryBuilder()
      .lookup({
        from: "surveyResults",
        foreignField: "surveyId",
        localField: "_id",
        as: "result",
      })
      .project({
        _id: 1,
        question: 1,
        answers: 1,
        date: 1,
        didAnswer: {
          $gte: [
            {
              $size: {
                $filter: {
                  input: "$result",
                  as: "item",
                  cond: {
                    $eq: ["$$item.accountId", new ObjectId(accountId)],
                  },
                },
              },
            },
            1,
          ],
        },
      })
      .build();
    const surveys = await surveyCollection.aggregate(query).toArray();
    return MongoHelper.mapCollection(surveys);
  }

  async loadById(id: string): Promise<LoadSurveyByIdRepository.Result> {
    const surveyCollection = MongoHelper.getCollection("surveys");
    const survey = await surveyCollection.findOne({ _id: new ObjectId(id) });
    return MongoHelper.map(survey) || null;
  }

  async loadAnswers(id: string): Promise<LoadAnswersBySurveyRepository.Result> {
    const surveyCollection = MongoHelper.getCollection("surveys");
    const query = new QueryBuilder()
      .match({
        _id: new ObjectId(id),
      })
      .project({
        _id: 0,
        answers: "$answers.answer",
      })
      .build();
    const surveys = await surveyCollection.aggregate(query).toArray();
    return surveys[0]?.answers || [];
  }

  async checkById(id: string): Promise<CheckSurveyByIdRepository.Result> {
    const surveyCollection = MongoHelper.getCollection("surveys");
    const survey = await surveyCollection.findOne(
      {
        _id: new ObjectId(id),
      },
      {
        projection: {
          _id: 1,
        },
      }
    );
    return survey !== null;
  }
}
