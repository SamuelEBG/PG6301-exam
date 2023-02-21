import express from "express";

export function requestUser(mongoDb) {
    return async (req, res, next) => {
        const {username} = req.signedCookies;
        if (username) {
            const usersFromDb = await mongoDb.collection("users")
                .find()
                .toArray();
            req.user = usersFromDb.find((u) => u.username === username);
            req.department = usersFromDb.find((u) => {
                if (u.username === username) {
                    return u.department;
                }
            });
        }
        next();
    };
}

export function createLoginRouter(mongoDatabase) {
    const login = express.Router();
    login.get("/", async (req, res) => {
        if (!req.user) {
            return res.sendStatus(204);
        }
        const { username, fullName, department } = req.user;
        return res.json({ username, fullName, department });
    });

    login.post("/", async (req, res) => {
        const {username, password} = req.body;  //The posts request body returns with the username and password
        const usersFromDb = await mongoDatabase.collection("users")
            .find()
            .toArray();
        const user = usersFromDb.find(
            (u) => u.username === username && u.password === password
        );
        if (!user) {
            return res.sendStatus(401);
        }
        res.cookie("username", username, {signed: true});
        res.sendStatus(200);
    });

    login.delete("/", (req, res) => {
        res.clearCookie("username");
        res.clearCookie("department");
        res.sendStatus(204);
    });

    return login;
}