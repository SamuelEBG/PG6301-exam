import { LogOut } from "../components/logout.jsx";
import { ErrorView } from "../components/error.jsx";
import { EmployeePage } from "./employeePage.jsx";
import { ManagerPage } from "./managerPage.jsx";

export function UserView(props) {
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
    console.log(props.user.department);
    console.log(props.user)
    return (
        <div>
            Welcome, {props.user.fullName}
            <div>
                <LogOut reload={props.reload} />
            </div>
            <div>
                {props.user.department != "manager" && <EmployeePage />}
                {props.user.department == "manager" && <ManagerPage />}
            </div>
        </div>
    );
}