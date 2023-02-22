import express from "express";
import { ObjectID } from "mongodb";

export function adminRouter(mongodb) {
    const admin = express.Router();
    admin.get("/", async (req, res) => {
        const users = await mongodb.collection("users").find().toArray();
        const { department } = req.signedCookies;
        if (department != "manager") {
            return res.sendStatus(403);
        }
        console.log(users)
        return res.json(users);
    });

    admin.post("/new", async (req, res) => {
        const { fullName, username, password, department} = req.body;
        await mongodb.collection("users")
            .insertOne( {fullName, username, password, department});
        res.sendStatus(200)
    })

    admin.put("/", async (req, res) => {
        if (!req.user) {
            return res.sendStatus(401);
        }
        if (req.user.department !== "manager") {
            return res.sendStatus(403);
        }
        console.log(req.body.username);
        console.log(req.body.id);
        const { id, fullName, username, password, department} = req.body;
        const user = { fullName, username, password, department };

        mongodb
            .collection("users")
            .updateOne({ _id: ObjectID(id) }, { $set: user })
            .catch((err) => console.error(`update failed with error: ${err}`));
        console.log("updated " + user.username);
        return res.sendStatus(204);
    });
    return admin;
}