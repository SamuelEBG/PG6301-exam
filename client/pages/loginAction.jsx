import {Link} from "react-router-dom";

export function LoginAction() {
    return (
        <div>
            <Link className={"button"} to={"/login"}>
                Login
            </Link>
        </div>
    );
}