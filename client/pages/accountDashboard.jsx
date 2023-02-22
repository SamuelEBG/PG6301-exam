import {Link} from "react-router-dom";

export function AccountDashboard() {
    return (
        <div>
            <Link className={"button"} to={"/createuser"}>
                Create user
            </Link>
            <Link className={"button"} to={"/edituser"}>
                Edit user
            </Link>
            <Link className={"button"} to={"/deleteuser"}>
                Delete user
            </Link>
        </div>
    );
}