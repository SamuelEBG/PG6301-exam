import {BrowserRouter, Routes, Route} from "react-router-dom";
import * as ReactDOM from "react-dom";

function Application() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={"/"} element={<FrontPage />} />
                <Route path={"/login"} element={<Login />} />
                <Route path={"/register"} element={<NewUser />} />
            </Routes>
        </BrowserRouter>
    );
}

ReactDOM.render(<Application />, document.getElementById("app"));