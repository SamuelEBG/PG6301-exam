import request from "supertest";
import express from "express";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { requestUser, createLoginRouter } from "../loginRouter.js";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(cookieParser("test"));

const mongoClient = new MongoClient(process.env.MONGODB_URL);
beforeAll(async () => {
    await mongoClient.connect();
    const database = mongoClient.db("test_database");
    app.use(requestUser(database));
    await database.collection("users").deleteMany({});
    app.use("/api/login", createLoginRouter(database));
    const user = {
        fullName: "test user",
        username: "test",
        password: "1234",
        department: "manager",
    };
    const user2 = {
        fullName: "another test user",
        username: "hello",
        password: "asd",
        department: "gym",
    };
    await database.collection("users").insertOne(user);
    await database.collection("users").insertOne(user2);
    app.use(express.static("../client/dist"));
});
afterAll(() => {
    mongoClient.close();
});
describe("login router test", () => {
    beforeAll(async () => {
        await request(app)
            .post("/api/login")
            .send({
                username: "test",
                password: "1234"
            })
            .expect(200);
    });

    it("cannot login with unregistered user", async () => {
        await request(app)
            .post("/api/login")
            .send({ username: "1234", password: "test" })
            .expect(401);
    });

    it("successful login", async () => {
        const agent = request.agent(app);
        await agent
            .post("/api/login")
            .send({ username: "test", password: "1234" })
            .expect(200);

        const res = await agent.get("/api/login").expect(200);
        expect(res.body.username).toContain("test");
    });

});
