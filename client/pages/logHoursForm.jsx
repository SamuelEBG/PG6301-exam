import React, {useState} from "react";

export function LogHoursForm(props){
    const [activity, setActivity] = useState('');
    const [date, setDate] = useState('');
    const [hours, setHours] = useState('');
    const [notes, setNotes] = useState('');
    const [error, setError] = useState(undefined);

    const minHours = 1;
    const maxHours = 8;

    function handleSubmit(event) {
        event.preventDefault();
        // Do something with the time entry data, such as send it to the server.
        // You can access the values of the fields using the state variables.
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
                <label>
                    Notes:
                    <textarea value={notes} onChange={event => setNotes(event.target.value)} />
                </label>
                <br />
                <button type="submit" disabled={!isTimeValid()}>Submit</button>
                {!isTimeValid() && <p>The hours worked must be between {minHours} and {maxHours}.</p>}
            </form>
        </div>
    );
}
