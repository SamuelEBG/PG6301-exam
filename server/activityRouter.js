import express from "express";

export function activityRouter(mongodb){
    const activity = express.Router();

    activity.get("/", async (req, res) => {
        const activities = await mongodb.collection("activities").find().toArray();

        return res.json(activities);
    });

    activity.post("/", (req, res) => {
        if (!req.user) {
            return res.sendStatus(401);
        }
        if (req.user.department !== "manager") {
            return res.sendStatus(403);
        }
        const {name, description } = req.body;
        const activity = { name, description };

        mongodb.collection("activities").insertOne(activity);
        res.sendStatus(200);
    });

    activity.delete("/", (req, res) =>{
        if (!req.user) {
            return res.sendStatus(401);
        }
        if (req.user.department !== "manager") {
            return res.sendStatus(403);
        }

        const { name } = req.body;

        mongodb
            .collection
            .deleteOne( { name: name })
            .catch((err) => console.error(`deletion failed with error: ${err}`));
        return res.sendStatus(204)
    });
    return activity;
}