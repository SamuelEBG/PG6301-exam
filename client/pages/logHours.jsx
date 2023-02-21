import React, {useContext, useState} from 'react';
import {Activitycontext} from "../lib/activityContext.jsx";
import {useLoader} from "../lib/useLoader.jsx";
import {LogHoursForm} from "./logHoursForm.jsx";

export function LogHours() {
    const { listActivities } = useContext(Activitycontext);
    const {data, error, loading} = useLoader(
        async () => listActivities(),
        []
    );
    if (error) {
        return <div>Error: {error.toString()}</div>;
    }
    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <LogHoursForm activities={data} />
        </div>
    );
}