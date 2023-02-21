import React from "react";
import { fetchJSON, postJSON } from "./http.js";

export const Usercontext = React.createContext({

    async loginUser(user) {
        return await postJSON("/api/login/", user);
    },
    async createUser(user) {
        return await postJSON("/api/login/new", user);
    },
});