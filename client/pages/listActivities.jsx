import {useContext, useState} from "react";
import {Activitycontext} from "../lib/activityContext.jsx";
import {CreateActivitiesList} from "./showActivities";
import {useLoader} from "../lib/useLoader.jsx";

export function ListActivities(props){
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
            <CreateActivitiesList activities={data} user={props.user}/>
        </div>
    );
}