import React, { useContext, useState } from "react";
import { Usercontext } from "../lib/userContext.jsx";
import { useNavigate } from "react-router-dom";
import {useLoader} from "../lib/useLoader.jsx";

export function DeleteUser() {
    const navigate = useNavigate();
    const { getUsers, deleteUser } = useContext(Usercontext);
    const [selectedUser, setSelectedUser] = useState("");
    const [submitError, setSubmitError] = useState(undefined);

    const {data, error, loading} = useLoader(
        async () => getUsers(),
        []
    );
    if (error) {
        return <div>Error: {error.toString()}</div>;
    }
    if (loading) {
        return <div>Loading...</div>;
    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            await deleteUser(selectedUser);
            navigate("/");
        } catch (e) {
            setSubmitError(e);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Select a user to delete:
                <select value={selectedUser} onChange={(e) => setSelectedUser(e.target.value)}>
                    <option value="" disabled>
                        -- Select a user --
                    </option>
                    {data.map((user) => (
                        <option key={user._id} value={user.username}>
                            {user.fullName}
                        </option>
                    ))}
                </select>
            </label>
            <br />
            <button type="submit">Delete user</button>
        </form>
    );
}