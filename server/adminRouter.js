import express from "express";

export function adminRouter(mongodb) {
    const admin = express.Router();
    admin.get("/", async (req, res) => {
        const users = await mongodb.collection("users").find().toArray();
        const { department } = req.signedCookies;
        if (department != "manager") {
            return res.sendStatus(403);
        }
        return res.json(users);
    });

    admin.post("/new", async (req, res) => {
        const { fullName, username, password, department} = req.body;
        await mongodb.collection("users")
            .insertOne( {fullName, username, password, department});
        res.sendStatus(200)
    })

    admin.put("/", async (req, res) => {
        const users = await mongodb.collection("users").find().toArray();
        const { department } = req.signedCookies;
        if(department == "manager"){
        const data = req.body;
            users.forEach((u) => {
                if (u.username === data.username) {
                    u.fullName = data.fullName;
                    u.username = data.name;
                    u.department = data.department;
                }
            });
            res.sendStatus(204);
        } else {
            res.sendStatus(401);
        }
    });
    return admin;
}