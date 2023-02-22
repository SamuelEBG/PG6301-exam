import React, { useContext, useState } from "react";
import {Usercontext} from "../lib/userContext.jsx";
import {useNavigate} from "react-router-dom";
import {useLoader} from "../lib/useLoader.jsx";

export function EditUser() {
    const navigate = useNavigate();
    const { getUsers, updateUser } = useContext(Usercontext);
    const [fullName, setFullName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [department, setDepartment] = useState("");
    const [editingUser, setEditingUser] = useState(null);

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

    const handleEdit = async (event) => {
        event.preventDefault();
        if (editingUser) {
            const updatedUser = {
                fullName,
                username,
                password,
                department,
                id: editingUser._id,
            };
            await updateUser(updatedUser);
            setEditingUser(null);
        }
    };

    const handleEditClick = (user) => {
        setFullName(user.fullName);
        setUsername(user.username);
        setPassword(user.password);
        setDepartment(user.department);
        setEditingUser(user);
    };

    return (
        <div>
            <h1>Edit User</h1>
            <form onSubmit={handleEdit}>
                <label>
                    Full Name:
                    <input
                        type="text"
                        name="fullName"
                        value={fullName}
                        onChange={(event) => setFullName(event.target.value)}
                    />
                </label>
                <label>
                    Username:
                    <input
                        type="text"
                        name="username"
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                    />
                </label>
                <label>
                    Password:
                    <input
                        type="password"
                        name="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                </label>
                <label>
                    Department:
                    <input
                        type="text"
                        name="department"
                        value={department}
                        onChange={(event) => setDepartment(event.target.value)}
                    />
                </label>
                <button type="submit">Save Changes</button>
            </form>
            <h2>Current Users</h2>
            <ul>
                {data.map((user) => (
                    <li key={user._id}>
                        {user.fullName} - {user.username} - {user.department}{" "}
                        <button onClick={() => handleEditClick(user)}>Edit</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}