import { LogOut } from "../components/logout.jsx";
import { ErrorView } from "../components/error.jsx";


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
    */
    return (
        <div>
            Welcome, {props.fullName}
            {<ErrorView error={props.error} />}
            <div>
                <LogOut reload={props.reload} />
            </div>
            <div>
                {admin !== "true" && <GetMeals />}
                {admin === "true" && <AddNewMeal />}
            </div>
        </div>
    );
}