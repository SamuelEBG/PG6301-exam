

export function CreateActivitiesList(props){
    console.log(props.activities);
    const department = props.user.department;
    let filteredActivities;
    switch(department){
        case "gym": filteredActivities = props.activities.filter(activity => activity.gym == "true"); break;
        case "cafeteria": filteredActivities = props.activities.filter(activity => activity.cafeteria == "true"); break;
        default: filteredActivities = props.activities; break;
    }

    return (
        <div id="activities">
            {filteredActivities.map((activity) => (
                <div id="activity-div">
                    <h3>{activity.name}</h3>
                    <div>
                        <li>Description: {activity.description}</li>
                    </div>
                </div>
            ))}
        </div>
    );
}