import express from "express";

export function logHoursRouter(mongodb) {
    const hours = express.Router();

    hours.get("/", async (req, res) => {
        const loggedHours = await mongodb.collection("loggedhours").find().toArray();

        return res.json(loggedHours);
    });

    hours.get("/:username", async (req, res) => {
        const username = req.params.username;
        const loggedHours = await mongodb.collection("loggedhours").find({ user: username }).toArray();

        return res.json(loggedHours);
    });

    hours.post("/", (req, res) => {
        const {user, date, hours, activity} = req.body;
        const loggedHours = {user, date, hours, activity};

        mongodb.collection("loggedhours").insertOne(loggedHours);
        res.sendStatus(200);
    });

    return hours;
}