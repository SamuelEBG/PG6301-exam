import React, { useContext, useState } from "react";
import {Usercontext} from "../lib/userContext.jsx";
import {useNavigate} from "react-router-dom";

export function CreateUserForm() {
    const navigate = useNavigate();
    const { createUser } = useContext(Usercontext);
    const [fullName, setFullName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [department, setDepartment] = useState("");
    const [error, setError] = useState(undefined);

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            await createUser({ fullName, username, password, department });
            navigate("/");
        } catch (e) {
            setError(e);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Full name:
                <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                />
            </label>
            <br />
            <label>
                Username:
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </label>
            <br />
            <label>
                Password:
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </label>
            <br />
            <label>
                Department:
                <input
                    type="text"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                />
            </label>
            <br />
            <button type="submit">Create user</button>
        </form>
    );
}
