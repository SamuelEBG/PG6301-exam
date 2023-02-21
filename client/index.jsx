import {BrowserRouter, Routes, Route} from "react-router-dom";
import * as ReactDOM from "react-dom";
import { FrontPage } from "./pages/frontpage.jsx";
import { Login } from "./pages/login.jsx";

/*
    <Route path={"/register"} element={<NewUser />} />
 */

function Application() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={"/"} element={<FrontPage />} />
                <Route path={"/login"} element={<Login />} />

            </Routes>
        </BrowserRouter>
    );
}

ReactDOM.render(<Application />, document.getElementById("app"));