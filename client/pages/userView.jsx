import { LogOut } from "../components/logout.jsx";
import { ErrorView } from "../components/error.jsx";
import {ListActivities} from "./listActivities";
import {ShowLoggedHours} from "./showLoggedHours";
import {LogHours} from "./logHours.jsx";
import {useNavigate} from "react-router-dom";
import {AccountDashboard} from "./accountDashboard";

export function UserView(props) {
    const navigate = useNavigate();

    console.log(props.user.department);
    return (
        <div>
            <div>
                <h1>
                    Welcome, {props.user.fullName}
                </h1>
                <LogOut reload={props.reload} />
                {props.user.department == "manager" &&
                    <button className={"button"} onClick={(e) => navigate("/accountdashboard")}>
                        User account dashboard
                    </button>}
            </div>
            <div>
                {props.user.department != "manager" && <ListActivities user={props.user}/>}
            </div>
            <div class="logged-hours-div">
                {props.user.department != "manager" && <ShowLoggedHours user={props.user}/>}
            </div>
            <div>
                {props.user.department != "manager" &&
                    <button className={"button"} onClick={(e) => navigate("/loghours", { state: { user: props.user } })}>
                        Register work
                    </button>}
                {props.user.department == "manager" && <ListActivities user={props.user} />}
            </div>
        </div>
    );
}