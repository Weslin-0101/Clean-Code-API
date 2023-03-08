import { Collection } from "mongodb";
import request from "supertest";
import { MongoHelper } from "@/infra/db/mongodb/helpes/mongo-helper";
import { setupApp } from "@/main/config/app";
import { hash } from "bcrypt";
import { Express } from "express";

let accountCollection: Collection;
let app: Express;

describe("Login Routes", () => {
  beforeAll(async () => {
    app = await setupApp();
    await MongoHelper.connect(process.env.MONGO_URL);
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  beforeEach(async () => {
    accountCollection = MongoHelper.getCollection("accounts");
    await accountCollection.deleteMany({});
  });

  describe("POST /signup", () => {
    test("Should return 200 on signup", async () => {
      await request(app)
        .post("/api/signup")
        .send({
          name: "Fulano",
          email: "fulano@email.com",
          password: "123456",
          passwordConfirmation: "123456",
        })
        .expect(200);
    });
  });

  describe("POST /login", () => {
    test("Should return 200 on login", async () => {
      const password = await hash("123456", 12);
      await accountCollection.insertOne({
        name: "Fulano",
        email: "fulano@email.com",
        password,
      });

      await request(app)
        .post("/api/login")
        .send({
          email: "fulano@email.com",
          password: "123456",
        })
        .expect(200);
    });

    test("Should return 401 on login", async () => {
      await request(app)
        .post("/api/login")
        .send({
          email: "fulano@email.com",
          password: "123456",
        })
        .expect(401);
    });
  });
});
