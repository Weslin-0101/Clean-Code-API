import { makeApolloServer } from "./helpers";
import { MongoHelper } from "@/infra/db/mongodb/helpes";

import { createTestClient } from "apollo-server-integration-testing";
import { Collection } from "mongodb";
import { hash } from "bcrypt";
import { ApolloServer, gql } from "apollo-server-express";

let accountCollection: Collection;
let apolloServer: ApolloServer;

describe("Login GraphQL", () => {
  beforeAll(async () => {
    apolloServer = makeApolloServer();
    await MongoHelper.connect(process.env.MONGO_URL);
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  beforeEach(async () => {
    accountCollection = MongoHelper.getCollection("accounts");
    await accountCollection.deleteMany({});
  });

  describe("Login Query", () => {
    const loginQuery = gql`
      query login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
          accessToken
          name
        }
      }
    `;

    test("Should return an account on valid credentials", async () => {
      const password = await hash("123456", 12);
      await accountCollection.insertOne({
        name: "Fulano",
        email: "fulano@email.com",
        password,
      });
      const { query } = createTestClient({ apolloServer });
      const res: any = await query(loginQuery, {
        variables: {
          email: "fulano@email.com",
          password: "123456",
        },
      });
      expect(res.data.login.accessToken).toBeTruthy();
      expect(res.data.login.name).toBe("Fulano");
    });

    test("Should return UnauthorizedError on invalid credentials", async () => {
      const { query } = createTestClient({ apolloServer });
      const res: any = await query(loginQuery, {
        variables: {
          email: "fulano@email.com",
          password: "123456",
        },
      });
      expect(res.data).toBeFalsy();
      expect(res.errors[0].message).toBe("Unauthorized");
    });
  });

  describe("SignUp Mutation", () => {
    const signUpMutation = gql`
      mutation signup(
        $name: String!
        $email: String!
        $password: String!
        $passwordConfirmation: String!
      ) {
        signup(
          name: $name
          email: $email
          password: $password
          passwordConfirmation: $passwordConfirmation
        ) {
          accessToken
          name
        }
      }
    `;

    test("Should return an account on valid data", async () => {
      const { mutate } = createTestClient({ apolloServer });
      const res: any = await mutate(signUpMutation, {
        variables: {
          name: "Fulano",
          email: "fulano@email.com",
          password: "123456",
          passwordConfirmation: "123456",
        },
      });
      expect(res.data.signup.accessToken).toBeTruthy();
      expect(res.data.signup.name).toBe("Fulano");
    });

    test("Should return EmailInUseError on invalid data", async () => {
      const password = await hash("123456", 12);
      await accountCollection.insertOne({
        name: "Fulano",
        email: "fulano@email.com",
        password,
      });
      const { mutate } = createTestClient({ apolloServer });
      const res: any = await mutate(signUpMutation, {
        variables: {
          name: "Fulano",
          email: "fulano@email.com",
          password: "123456",
          passwordConfirmation: "123456",
        },
      });
      expect(res.data).toBeFalsy();
      expect(res.errors[0].message).toBe(
        "The received email is already in use"
      );
    });
  });
});
