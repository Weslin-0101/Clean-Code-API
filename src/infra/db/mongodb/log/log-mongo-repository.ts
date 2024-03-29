import { LogErrorRepository } from "@/data/protocols/db/log/log-error-repository";
import { MongoHelper } from "../helpes/mongo-helper";

export class LogMongoRepository implements LogErrorRepository {
  async logError(stackError: string): Promise<void> {
    const errorCollection = MongoHelper.getCollection("errors");
    await errorCollection.insertOne({
      stackError,
      date: new Date(),
    });
  }
}
