import { Collection } from "mongodb";
import { MongoHelper } from "@/infra/db/mongodb/helpes/mongo-helper";
import { LogMongoRepository } from "@/infra/db/mongodb/log/log-mongo-repository";
import faker from "faker";

const makeSut = (): LogMongoRepository => {
  return new LogMongoRepository();
};

describe("Log mongo Repository", () => {
  let logCollection: Collection;

  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL);
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  beforeEach(async () => {
    logCollection = await MongoHelper.getCollection("errors");
    await logCollection.deleteMany({});
  });

  test("Should create an error log on success", async () => {
    const sut = makeSut();
    await sut.logError(faker.random.words());
    const count = await logCollection.countDocuments();
    expect(count).toBe(1);
  });
});
