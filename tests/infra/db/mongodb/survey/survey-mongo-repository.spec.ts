import { Collection } from "mongodb";
import { MongoHelper } from "@/infra/db/mongodb/helpes/mongo-helper";
import { SurveyMongoRepository } from "@/infra/db/mongodb/survey/survey-mongo-repository";
import {
  mockAddAccountParams,
  mockAddSurveyParams,
} from "@/tests/domain/mocks";

let surveyCollection: Collection;
let surveyResultCollection: Collection;
let accountCollection: Collection;

const mockAccountId = async (): Promise<string> => {
  const res = await accountCollection.insertOne(mockAddAccountParams());
  return MongoHelper.map(res);
};

describe("Survey Mongo Repository", () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL);
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  beforeEach(async () => {
    surveyCollection = await MongoHelper.getCollection("surveys");
    await surveyCollection.deleteMany({});
    surveyResultCollection = await MongoHelper.getCollection("surveyResults");
    await surveyResultCollection.deleteMany({});
    accountCollection = await MongoHelper.getCollection("accounts");
    await accountCollection.deleteMany({});
  });

  describe("add()", () => {
    test("Should add a survey on success", async () => {
      const sut = new SurveyMongoRepository();
      await sut.add(mockAddSurveyParams());
      const count = await surveyCollection.countDocuments();
      expect(count).toBe(1);
    });
  });

  describe("loadAll()", () => {
    test("Should load all surveys on success", async () => {
      // const mockAccountId = await mockAccount();
      // const addSurveyModels = [mockAddSurveyParams(), mockAddSurveyParams()];
      // const result = await surveyCollection.insertMany(addSurveyModels);
      // const surveyIds = result.insertedIds;
      // const sut = new SurveyMongoRepository();
      // await surveyResultCollection.insertOne({
      //   surveyId: surveyIds[0].id,
      //   accountId,
      //   answer: surveyIds,
      //   date: new Date(),
      // });
      // const surveys = await sut.loadAll(account.id);
      // expect(surveys[0].question).toBe(addSurveyModels[0].question);
      // expect(surveys[0].didAnswer).toBe(true);
      // expect(surveys[1].question).toBe(addSurveyModels[1].question);
      // expect(surveys[1].didAnswer).toBe(false);
    });

    test("Should load empty list", async () => {
      // const account = await mockAccount();
      // const sut = new SurveyMongoRepository();
      // const surveys = await sut.loadAll(account.id);
      // expect(surveys).toBeInstanceOf(Array);
      // expect(surveys.length).toBe(0);
    });
  });

  describe("loadById()", () => {
    test("Should load all survey by id on success", async () => {
      //   const res = await surveyCollection.insertOne(mockAddSurveyParams());
      //   const sut = makeSut();
      //   const survey = await sut.loadById(res.ops[0]._id);
      //   expect(survey).toBeTruthy();
      //   expect(survey.id).toBeTruthy();
    });
  });
});
