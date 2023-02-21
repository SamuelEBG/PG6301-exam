import React, {useContext, useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import { Hourscontext } from "../lib/hoursContext.jsx";
import {ErrorView} from "../components/error.jsx";

export function LogHoursForm(props){
    const navigate = useNavigate();
    const { addHours } = useContext(Hourscontext);
    const [username, setUsername] = useState('');
    const [activity, setActivity] = useState('');
    const [date, setDate] = useState('');
    const [hours, setHours] = useState('');
    const [error, setError] = useState(undefined);

    const minHours = 1;
    const maxHours = 8;
    const location = useLocation();

    useEffect(() => {
        setUsername(location.state.user.username);
    }, [location.state.user.username]);

    async function handleSubmit(e) {
        e.preventDefault();
        const timesheet = {
            user: username,
            date: date,
            hours: hours,
            activity: activity
        };
        try {
            await addHours(timesheet);

            navigate("/");
        } catch (e) {
            setError(e);
        }
    }

    function isTimeValid() {
        const totalHours = parseInt(hours, 10);
        return (
            totalHours >= minHours &&
            totalHours <= maxHours
        );
    }

    return (
        <div>
            {error && <ErrorView error={error} />}
            <form onSubmit={handleSubmit}>
                <label>
                    Activity:
                    <select value={activity} onChange={event => setActivity(event.target.value)}>
                        <option value="">Select an activity</option>
                        {props.activities.map(activity => (
                            <option key={activity.name} value={activity.name}>{activity.name}</option>
                        ))}
                    </select>
                </label>
                <br />
                <label>
                    Date:
                    <input type="date" value={date} onChange={event => setDate(event.target.value)} />
                </label>
                <br />
                <label>
                    Hours:
                    <input type="number" value={hours} onChange={event => setHours(event.target.value)} min={minHours} max={maxHours} required />
                </label>
                <br />
                <button type="submit" disabled={!isTimeValid()}>Submit</button>
                {!isTimeValid() && <p>The hours worked must be between {minHours} and {maxHours}.</p>}
            </form>
        </div>
    );
}
