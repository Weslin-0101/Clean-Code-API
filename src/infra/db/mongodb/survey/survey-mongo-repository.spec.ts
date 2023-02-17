import { Collection } from "mongodb";
import { MongoHelper } from "../helpes/mongo-helper";
import { SurveyMongoRepository } from "./survey-mongo-repository";
import { mockAddSurveyParams } from "@/domain/test";

let surveyCollection: Collection;

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
      const addSurveyModels = [mockAddSurveyParams(), mockAddSurveyParams()];
      await surveyCollection.insertMany(addSurveyModels);
      const sut = new SurveyMongoRepository();
      const surveys = await sut.loadAll();
      expect(surveys[0].question).toBe(addSurveyModels[0].question);
      expect(surveys[1].question).toBe(addSurveyModels[1].question);
    });

    test("Should load empty list", async () => {
      const sut = new SurveyMongoRepository();
      const surveys = await sut.loadAll();
      expect(surveys).toBeInstanceOf(Array);
      expect(surveys.length).toBe(0);
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
