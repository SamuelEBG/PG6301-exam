# PG6301-exam

PG6301 spring exam

## azure
https://pg6301examsegb.azurewebsites.net

## Solution
Time management tool for a climbing gym.
Employees can login and register time spent on activities in the company.
Managers can login and see all time registered for each employee, together with
a account dashboard where the manager can create, update and delete a user.

## Known issues
I did not manage to solve the task of how to limit users from registering
no more than 150 hours for each month, i could not parse the date that gets stored as a
string to mongodb and somehow limiting users from adding more than 150 hours.
I did not have enough time to implement managers adding and editing activities.
Managers cannot add or remove activites from different departments.

### Predefined Users
* Managers:

 manager for the gym:
- username: managermagnus
- password: 1fingerpullups

 manager for the cafeteria:
- username: nancy
- password: coffee

Employees:

 gym department:
- username: derek
- password: ropesnharness

cafeteria:
- username: greg
- password: espresso

## Endpoints for server and client
* /api/login {POST, GET, DELETE}
* /api/activities {POST, GET, DELETE}
* /api/loggedhours {GET, GET:username, POST}
* /api/admin {GET, POST, PUT}


* [x] Some form of Login and access control
* [x] Jest tests
 * [ ] Snapshot tests
 * [x] Simulate + jest.fn
 * [x] Supertest
* [ ] Github Actions with coverage report
* [ ] Deployment to cloud (in this case, Azure)
* [x] Mongodb
* [x] Navigating in the application using React Router (remember Express Middleware)
* [x] Reading data from the server (remember error handling)
* [x] Writing data to the server
* [ ] Websockets
