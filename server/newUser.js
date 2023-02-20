import { Router } from "express";

export function createNewUser(mongoDb) {
    const router = new Router();

    router.get("/", async (req, res) => {
        const dbUsers = await mongoDb
            .collection("users")
            .find()
            .toArray()
        res.json(dbUsers);
    })

    router.post("/", async (req, res) => {
        const { fullName, username, password, admin="false"} = req.body;
        await mongoDb.collection("users")
            .insertOne( {fullName, username, password, admin});
        res.sendStatus(200)
    })

    return router;
}