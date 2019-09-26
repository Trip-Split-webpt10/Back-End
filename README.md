# Back-End

Canvas: https://docs.google.com/document/d/1XU1Rprf2HOTgPbvoNaiRjo_h7qlUggh9LgDbJeL75XI/edit#

# trip-split-BE

This is the repository for **Trip-Split Back End** project.

# API URL
https://trip-split-api.herokuapp.com/api

# Endpoints

| Method | URL | Description |
| -- | -- | -- |
| Users | -- | -- |
| GET | /users/:id | **:id = user id.** Returns username and name of the user |
| GET | /users/:id/trips | **:id = user id.** Returns trips tied to the user |
| -- | -- | -- |
| POST | /users/register | Adds user creds to DB. Returns id, username, name of user, and JWT |
| POST | /users/login | Allows user access. Returns the user info, success message, and JWT |
| -- | -- | -- |
| Trips | -- | -- |
| GET | /trips | Returns an array of all trips on DB. Returns id, destination, complete, start_date, end_date |
| GET | /trips/:id | **:id = trip id.** Returns all trip information(see below) |
| GET | /trips/:id/expenses | **:id = trip id.** Returns all expenses for a trip. id, desitination, name, price |
| GET | /trips/:id/users | **:id = trip id.** Returns all users for a trip. id, name |
| GET | /trips/:id/users/expenses | **:id = trip id.** Returns an array of objects that show all amounts paid by each user for the trip |
| -- | -- | -- |
| POST | /trips | Adds trip to DB. Returns trip id, destination, complete, start_date and end_date. Requires destination|
| POST | /trips/:id/users | **:id = trip id.** Adds user to trip. Returns trip user list. Requires username|
| -- | -- | -- |
| Expenses | -- | -- |
| GET | /expenses | Returns an array of all expenses on DB. Returns id, name, price, trip_id, destination |
| GET | /expenses/:id | **:id = expense id.** Returns all expense information (see below). |
| GET | /expenses/:id/users | **:id = expense id.** Returns all users for single expense. |
| -- | -- | -- |
| POST | /expenses | Adds expense to DB. Returns expense id, name, price, trip_id, destination. Requires name, trip_id, price|
| POST | /expenses/:id | **:id = expense id.** Adds user to expense. Returns expense with list of users. requires user_id|

### Single Trip object
```js
{
  "trip": {
    "id": 1,
    "destination": "Hawaii",
    "complete": false,
    "start_date": "2019-12-10",
    "end_date": "2019-12-17"
  },
  "expenses": [
    {
      "id": 1,
      "destination": "Hawaii",
      "name": "Plane tickets",
      "price": 650
    },
    {
      "id": 2,
      "destination": "Hawaii",
      "name": "Resort Stay",
      "price": 250
    }
  ],
  "users": [
    {
      "id": 1,
      "name": "Chris Test"
    },
    {
      "id": 2,
      "name": "User Test"
    }
  ],
  "totalUsers": 2
}
```

### Single Expense object
```js
{
  "expense": [
    {
      "id": 2,
      "name": "Resort Stay",
      "price": 250,
      "trip_id": 1,
      "destination": "Hawaii"
    }
  ],
  "users": [
    {
      "id": 1,
      "name": "Chris Test",
      "expense_name": "Resort Stay",
      "amount": 50
    },
    {
      "id": 2,
      "name": "User Test",
      "expense_name": "Resort Stay",
      "amount": 200
    }
  ]
}
```

# Schema

### Users

| field | data type        | metadata |
| ----- | ---------------- | -- |
| id    | unsigned integer | primary key, auto-increments, generated by database |
| username | string        | required, unique |
| password | string | required, encrypted by the server |
| name | string | required |

### Trips

| field | data type        | metadata |
| ----- | ---------------- | -- |
| id    | unsigned integer | primary key, auto-increments, generated by database |
| destination | string | required |
| complete | boolean | defaults to false |
| start_date | date | not required |
| end_date | date | not required |

### Expenses 

| field | data type        | metadata |
| ----- | ---------------- | -- |
| id    | unsigned integer | primary key, auto-increments, generated by database |
| name | string | required |
| price | decimal | required |
| trip_id | unsigned integer | foriegn key to 'trips' table |

### User_Trips 

| field | data type        | metadata |
| ----- | ---------------- | -- |
| user_id    | unsigned integer | foriegn key to 'users' table |
| trip_id | unsigned integer | foriegn key to 'trips' table |

### User_Expenses 

| field | data type        | metadata |
| ----- | ---------------- | -- |
| user_id    | unsigned integer | foriegn key to 'users' table |
| expense_id | unsigned integer | foriegn key to 'expenses' table |
| amount | decimal | not required |
