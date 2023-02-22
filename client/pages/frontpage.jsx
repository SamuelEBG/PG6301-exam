import { useLoader } from "../lib/useLoader.jsx";
import { fetchJSON } from "../lib/http.js";
import { UserView } from "./userView.jsx";
import {LoginAction} from "./loginAction.jsx";

export function FrontPage() {
    const { data, loading, error, reload } = useLoader(
        async () => await fetchJSON("/api/login")
    );

    if (error) {
        return <div>Error: {error.toString()}</div>;
    }

    if (loading) {
        return <div>Loading...</div>;
    }
    return (
        <div>
            <h1 id="login">TimeRegister</h1>
            {data ? <UserView user={data} reload={reload} /> : <LoginAction />}
        </div>
    );
}