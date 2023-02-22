import {BrowserRouter, Routes, Route} from "react-router-dom";
import * as ReactDOM from "react-dom";
import { FrontPage } from "./pages/frontpage.jsx";
import { Login } from "./pages/login.jsx";
import {LogHours} from "./pages/logHours.jsx";
import {CreateUserForm} from "./pages/createUser.jsx";
import {EditUser} from "./pages/editUser.jsx";
import {DeleteUser} from "./pages/deleteUser.jsx";
import {AccountDashboard} from "./pages/accountDashboard";

/*
    <Route path={"/register"} element={<NewUser />} />
 */

function Application() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={"/"} element={<FrontPage />} />
                <Route path={"/login"} element={<Login />} />
                <Route path={"/loghours"} element={<LogHours />} />
                <Route path={"/accountdashboard"} element={<AccountDashboard />} />
                <Route path={"/createuser"} element={<CreateUserForm />} />
                <Route path={"/edituser"} element={<EditUser />} />
                <Route path={"/deleteuser"} element={<DeleteUser />} />
            </Routes>
        </BrowserRouter>
    );
}

ReactDOM.render(<Application />, document.getElementById("app"));