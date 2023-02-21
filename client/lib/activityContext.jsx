import React from "react";
import { fetchJSON, postJSON } from "./http.js";

export const Activitycontext = React.createContext({

    async listActivities() {
        return await fetchJSON("/api/activities");
    },
    async createUser(user) {
        return await postJSON("/api/login/new", user);
    },
});