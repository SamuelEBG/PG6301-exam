import {ShowLoggedHours} from "./showLoggedHours";
import {useContext} from "react";
import {Usercontext} from "../lib/userContext.jsx";
import {useLoader} from "../lib/useLoader.jsx";

export function ManagerDashboard() {
    const { getUsers } = useContext(Usercontext);
    const {data, error, loading} = useLoader(
        async () => getUsers(),
        []
    );
    if (error) {
        return <div>Error: {error.toString()}</div>;
    }
    if (loading) {
        return <div>Loading...</div>;
    }
    console.log(data);
    return (
        <div>
            {data.map((user) => (
                <ShowLoggedHours key={user._id} user={user} />
            ))}
        </div>
    );
}