import express from "express";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { adminRouter } from "../adminRouter.js";
import cookieParser from "cookie-parser";
import request from "supertest";

const app = express();
app.use(bodyParser.json());
app.use(cookieParser("test"));
let mongoClient;

beforeAll(async () => {
    dotenv.config();
    mongoClient = new MongoClient(process.env.MONGODB_URL);
    await mongoClient.connect();
    const database = mongoClient.db("test_database");
    await database.collection("users").deleteMany({});
    app.use("/api/admin", adminRouter(database))
});

afterAll(() => {
    mongoClient.close();
});

describe("users api", () => {
    it("lists added users", async () => {
        const fullName = "New test user";
        const username = "tester";
        const password = "123";
        const department = "gym";
        await request(app)
            .post("/api/admin/new")
            .send({ fullName, username, password, department})
            .expect(200);
    });
});