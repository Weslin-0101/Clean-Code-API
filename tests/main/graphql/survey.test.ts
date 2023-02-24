import { makeApolloServer } from "./helpers";
import { MongoHelper } from "@/infra/db/mongodb/helpes";

import { createTestClient } from "apollo-server-integration-testing";
import { Collection } from "mongodb";
import { ApolloServer, gql } from "apollo-server-express";
import env from "@/main/config/env";
import { sign } from "jsonwebtoken";
import { hash } from "bcrypt";

let surveyCollection: Collection;
let accountCollection: Collection;
let apolloServer: ApolloServer;

const makeAccessToken = async (): Promise<string> => {
  const res = await accountCollection.insertOne({
    name: "Lucas",
    email: "anyemail@email.com",
    password: "123",
    role: "admin",
  });

  const id = res.insertedId.toHexString();
  const accessToken = sign({ id }, env.jwtSecret);
  await accountCollection.updateOne(
    {
      _id: id,
    },
    {
      $set: {
        accessToken,
      },
    }
  );
  return accessToken;
};

describe("Survey GraphQL", () => {
  beforeAll(async () => {
    apolloServer = makeApolloServer();
    await MongoHelper.connect(process.env.MONGO_URL);
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  beforeEach(async () => {
    surveyCollection = await MongoHelper.getCollection("surveys");
    await surveyCollection.deleteMany({});
    accountCollection = await MongoHelper.getCollection("accounts");
    await accountCollection.deleteMany({});
  });

  describe("Surveys Query", () => {
    const surveysQuery = gql`
      query surveys {
        surveys {
          id
          question
          answers {
            image
            answer
          }
          date
          didAnswer
        }
      }
    `;

    test("Should return Surveys", async () => {
      // const accessToken = await makeAccessToken();
      // await surveyCollection.insertOne({
      //   question: "Question",
      //   answers: [
      //     {
      //       image: "http://image-name.com",
      //       answer: "Answer 1",
      //     },
      //     {
      //       answer: "Answer 2",
      //     },
      //   ],
      //   date: new Date(),
      // });
      // const { query } = createTestClient({
      //   apolloServer,
      //   extendMockRequest: {
      //     headers: {
      //       "x-access-token": accessToken,
      //     },
      //   },
      // });
      // const res: any = await query(surveysQuery);
      // expect(res.data.surveys.length).toBe(1);
      // expect(res.data.surveys[0].id).toBeTruthy();
      // expect(res.data.surveys[0].question).toBe("Question");
      // expect(res.data.surveys[0].didAnswer).toBe(false);
    });
  });
});
