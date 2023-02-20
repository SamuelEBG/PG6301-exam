import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import * as path from "path";
import { createLoginRouter, requestUser } from "./loginRouter.js";
import { createNewUser } from "./newUser.js";
import { MongoClient } from "mongodb";

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(cookieParser(process.env.COOKIE_SECRET));

const mongoClient = new MongoClient(process.env.MONGODB_URL);
mongoClient.connect().then( async () => {
    console.log("Connected to mongodb");

    const db = mongoClient.db("timeregister");

    app.use(requestUser(mongoClient.db("timeregister")));
    app.use("/api/login", createLoginRouter(mongoClient.db("timeregister")));
    app.use("/api/register", createNewUser(mongoClient.db("timeregister")));
})

app.use(express.static("../client/dist"));

app.use((req, res, next) => {
    if (req.method === "GET" && !req.path.startsWith("/api")) {
        res.sendFile(path.resolve("../client/dist/index.html"));
    } else {
        next();
    }
});

const server = app.listen(process.env.PORT || 3000, () => {
    console.log(`Listening on http://localhost:${server.address().port}`);
});