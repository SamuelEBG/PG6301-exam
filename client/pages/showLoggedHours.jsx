import { useContext, useEffect, useState } from "react";
import { Hourscontext } from "../lib/hoursContext.jsx";

export function ShowLoggedHours(props) {
    const { getUserHours } = useContext(Hourscontext);
    const [userHours, setUserHours] = useState([]);

    useEffect(() => {
        const fetchUserHours = async () => {
            const response = await getUserHours(props.user.username);
            setUserHours(response);
        };

        fetchUserHours();
    }, [props.user.username]);

    return (
        <div>
            <h2>Logged Hours for {props.user.username}</h2>
            <ul>
                {userHours.map((hour) => (
                    <li key={hour._id}>
                        {hour.date} - {hour.hours} hours - {hour.activity}
                    </li>
                ))}
            </ul>
        </div>
    );
}

