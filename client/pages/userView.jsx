import { LogOut } from "../components/logout.jsx";
import { ErrorView } from "../components/error.jsx";
import {ListActivities} from "./listActivities";
import {ShowLoggedHours} from "./showLoggedHours";
import {LogHours} from "./logHours.jsx";
import {useNavigate} from "react-router-dom";

export function UserView(props) {
    const navigate = useNavigate();
    /*
    const {
        error,
        handleSubmit: handleLogout,
        submitting,
    } = useSubmit(async () => {
        await fetchJSON("/api/login", {
            method: "DELETE",
        });
        reload();
    });

    errors: {<ErrorView error={props.error} />}
    */
    return (
        <div>
            Welcome, {props.user.fullName}
            <div>
                <LogOut reload={props.reload} />
            </div>
            <div>
                {props.user.department != "manager" && <ListActivities user={props.user}/>}
                {props.user.department != "manager" && <ShowLoggedHours user={props.user}/>}
                {props.user.department != "manager" && <button className={"button"} onClick={(e) => navigate("/loghours")}>
                    Register work
                    </button>}
                {props.user.department == "manager" && <ListActivities user={props.user} />}
            </div>
        </div>
    );
}