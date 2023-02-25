import { SurveyModel } from "@/domain/models/survey";
import { Collection, ObjectId } from "mongodb";
import { MongoHelper } from "@/infra/db/mongodb/helpes/mongo-helper";
import { SurveyResultMongoRepository } from "@/infra/db/mongodb/survey-result/survey-result-mongo-repository";
import {
  mockAddAccountParams,
  mockAddSurveyParams,
} from "@/tests/domain/mocks";

let surveyCollection: Collection;
let surveyResultCollection: Collection;
let accountCollection: Collection;

const makeSurvey = async (): Promise<SurveyModel> => {
  const res = await surveyCollection.insertOne(mockAddSurveyParams());
  const survey = await surveyCollection.findOne({ _id: res.insertedId });
  return MongoHelper.map(survey);
};

const makeAccount = async (): Promise<string> => {
  const res = await accountCollection.insertOne(mockAddAccountParams());
  return res.insertedId.toHexString();
};

describe("Survey Mongo Repository", () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL);
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  beforeEach(async () => {
    surveyCollection = MongoHelper.getCollection("surveys");
    await surveyCollection.deleteMany({});
    surveyResultCollection = MongoHelper.getCollection("surveyResults");
    await surveyResultCollection.deleteMany({});
    accountCollection = MongoHelper.getCollection("accounts");
    await accountCollection.deleteMany({});
  });

  describe("save()", () => {
    test("Should add a survey result if its new", async () => {
      const survey = await makeSurvey();
      const account = await makeAccount();
      const sut = new SurveyResultMongoRepository();
      await sut.save({
        surveyId: survey.id,
        accountId: account,
        answer: survey.answers[0].answer,
        date: new Date(),
      });
      const surveyResult = await surveyResultCollection.findOne({
        surveyId: new ObjectId(survey.id),
        accountId: new ObjectId(account),
      });
      expect(surveyResult).toBeTruthy();
    });

    test("Should update survey result if its not new", async () => {
      const survey = await makeSurvey();
      const account = await makeAccount();
      await surveyResultCollection.insertOne({
        surveyId: new ObjectId(survey.id),
        accountId: new ObjectId(account),
        answer: survey.answers[0].answer,
        date: new Date(),
      });
      const sut = new SurveyResultMongoRepository();
      await sut.save({
        surveyId: survey.id,
        accountId: account,
        answer: survey.answers[1].answer,
        date: new Date(),
      });
      const surveyResult = await surveyResultCollection
        .find({
          surveyId: new ObjectId(survey.id),
          accountId: new ObjectId(account),
        })
        .toArray();
      expect(surveyResult).toBeTruthy();
      expect(surveyResult.length).toBe(1);
    });
  });

  describe("loadBySurveyId()", () => {
    test("Should load survey result", async () => {
      const survey = await makeSurvey();
      const account = await makeAccount();
      const account2 = await makeAccount();
      await surveyResultCollection.insertMany([
        {
          surveyId: new ObjectId(survey.id),
          accountId: new ObjectId(account2),
          answer: survey.answers[0].answer,
          date: new Date(),
        },
        {
          surveyId: new ObjectId(survey.id),
          accountId: new ObjectId(account),
          answer: survey.answers[0].answer,
          date: new Date(),
        },
      ]);
      const sut = new SurveyResultMongoRepository();
      const surveyResult = await sut.loadBySurveyId(survey.id, account);
      expect(surveyResult).toBeTruthy();
      expect(surveyResult.surveyId).toEqual(survey.id);
      expect(surveyResult.answers[0].count).toBe(2);
      expect(surveyResult.answers[0].percent).toBe(100);
      expect(surveyResult.answers[0].isCurrentAccountAnswer).toBe(true);
      expect(surveyResult.answers[1].count).toBe(0);
      expect(surveyResult.answers[1].percent).toBe(0);
      expect(surveyResult.answers[1].isCurrentAccountAnswer).toBe(false);
      expect(surveyResult.answers.length).toBe(survey.answers.length);
    });

    test("Should return null if there is no survey result", async () => {
      const survey = await makeSurvey();
      const accountId = await makeAccount();
      const sut = new SurveyResultMongoRepository();
      const surveyResult = await sut.loadBySurveyId(survey.id, accountId);
      expect(surveyResult).toBeNull();
    });
  });
});
