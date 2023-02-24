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
      _id: res.insertedId,
    },
    {
      $set: {
        accessToken,
      },
    }
  );
  return accessToken;
};

describe("SurveyResult GraphQL", () => {
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

  describe("SurveysResult Query", () => {
    const surveyResultQuery = gql`
      query surveyResult($surveyId: String!) {
        surveyResult(surveyId: $surveyId) {
          question
          answers {
            answer
            count
            percent
            isCurrentAccountAnswer
          }
          date
        }
      }
    `;

    // test("Should return SurveyResult", async () => {
    //   const accessToken = await makeAccessToken();
    //   const surveyRes = await surveyCollection.insertOne({
    //     question: "Question",
    //     answers: [
    //       {
    //         image: "http://image-name.com",
    //         answer: "Answer 1",
    //       },
    //       {
    //         answer: "Answer 2",
    //       },
    //     ],
    //     date: new Date(),
    //   });
    //   const { query } = createTestClient({
    //     apolloServer,
    //     extendMockRequest: {
    //       headers: {
    //         "x-access-token": accessToken,
    //       },
    //     },
    //   });
    //   const res: any = await query(surveyResultQuery, {
    //     variables: {
    //       surveyId: surveyRes.insertedId.toHexString(),
    //     },
    //   });
    //   expect(res.data.surveyResult.question).toBe("Question");
    // });

    test("Should return returns AccessDeniedError if no token is provided", async () => {
      const surveyRes = await surveyCollection.insertOne({
        question: "Question",
        answers: [
          {
            image: "http://image-name.com",
            answer: "Answer 1",
          },
          {
            answer: "Answer 2",
          },
        ],
        date: new Date(),
      });
      const { query } = createTestClient({
        apolloServer,
      });
      const res: any = await query(surveyResultQuery, {
        variables: {
          surveyId: surveyRes.insertedId.toHexString(),
        },
      });
      expect(res.data).toBeFalsy();
      expect(res.errors[0].message).toBe("Access denied");
    });
  });

  describe("SaveSurveyResult Mutation", () => {
    const SaveSurveyResultMutation = gql`
      mutation saveSurveyResult($surveyId: String!, $answer: String!) {
        saveSurveyResult(surveyId: $surveyId, answer: $answer) {
          question
          answers {
            answer
            count
            percent
            isCurrentAccountAnswer
          }
          date
        }
      }
    `;

    // test("Should return SavesurveyResult", async () => {
    //   const accessToken = await makeAccessToken();
    //   const surveyRes = await surveyCollection.insertOne({
    //     question: "Question",
    //     answers: [
    //       {
    //         image: "http://image-name.com",
    //         answer: "Answer 1",
    //       },
    //       {
    //         answer: "Answer 2",
    //       },
    //     ],
    //     date: new Date(),
    //   });
    //   const { query } = createTestClient({
    //     apolloServer,
    //     extendMockRequest: {
    //       headers: {
    //         "x-access-token": accessToken,
    //       },
    //     },
    //   });
    //   const res: any = await query(surveyResultQuery, {
    //     variables: {
    //       surveyId: surveyRes.insertedId.toHexString(),
    //     },
    //   });
    //   expect(res.data.surveyResult.question).toBe("Question");
    // });

    test("Should return returns AccessDeniedError if no token is provided", async () => {
      const surveyRes = await surveyCollection.insertOne({
        question: "Question",
        answers: [
          {
            image: "http://image-name.com",
            answer: "Answer 1",
          },
          {
            answer: "Answer 2",
          },
        ],
        date: new Date(),
      });
      const { mutate } = createTestClient({
        apolloServer,
      });
      const res: any = await mutate(SaveSurveyResultMutation, {
        variables: {
          surveyId: surveyRes.insertedId.toHexString(),
          answer: "Answer 1",
        },
      });
      expect(res.data).toBeFalsy();
      expect(res.errors[0].message).toBe("Access denied");
    });
  });
});
