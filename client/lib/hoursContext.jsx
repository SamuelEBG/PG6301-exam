import React from "react";
import { fetchJSON, postJSON } from "./http.js";

export const Hourscontext = React.createContext({

    async addHours(activity) {
        return await postJSON("/api/loggedhours", activity);
    },
    async getHours(user) {
        return await fetchJSON("/api/loggedhours", user);
    },
    async getUserHours(username) {
        return await fetchJSON(`/api/loggedhours/${username}`);
    },
});