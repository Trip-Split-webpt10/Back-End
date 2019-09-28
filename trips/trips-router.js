const router = require('express').Router();

const Trips = require('./trips-model');
const Users = require('../users/users-model')

// Get Endpoint to get a list of all trips. /api/trips
router.get('/', (req, res) => {
    Trips.findTrips()
        .then(trips => {
            trips.forEach(trip => {
                trip.complete = !!trip.complete
            })
            res.send(trips)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                message: "Unable to get list of trips"
            })
        })
})

// Get Endpoint to get a specific trip. /api/trips/:id. Will also retur a list of epxenses and users for the trip
router.get('/:id', (req, res) => {
    const { id } = req.params

    Trips.findTripById(id)
    .then(trip => {
        trip.complete = !!trip.complete

        Trips.findTripExpenses(id)
            .then(expenses => {
                Trips.findTripUsers(id)
                    .then(users => {
                        res.send({trip, expenses: expenses, users: users, totalUsers: users.length})
                    })
            })
    })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                message: "Unable to get trip"
            })
        })
})

//Get Endpoint that shows a list of expenses tied to a trip. /api/trips/:id/expenses
router.get('/:id/expenses', (req, res) => {
    const { id } = req.params

    Trips.findTripExpenses(id)
        .then(expenses => {
            res.send(expenses)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        })
})

//Get Endpoint that shows the list of users tied to a trip. /api/trips/:id/users
router.get('/:id/users', (req, res) => {
    const { id } = req.params

    Trips.findTripUsers(id)
        .then(users => {
            res.send(users)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        })
})

//Get Endpoint that shows a list of all expenses paid by each user for a trip. /api/trips/users/expenses
router.get('/:id/users/expenses', (req, res) => {
    const { id } = req.params

    Trips.findUserExpenses(id)
        .then(user => {
            res.send(user)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        })
})

//Post Endpoint that adds a new user to a trip. /api/:id/users
router.post('/:id/users', (req, res) => {
    const { id } = req.params;
    const { username } = req.body;

    Users.findBy({ username })
        .first()
            .then(user => {
                const user_id = user.id
                const add = {user_id: user_id, trip_id: id}
                Trips.addUser(add)
                    .then(newUser => {
                        Trips.findTripUsers(id)
                            .then(newList => {
                                res.status(201).json(newList)
                            })
                    })
            })
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        })
})

//Post endpoint that adds a new trip to the db. /api/trips
router.post('/', (req, res) => {
    const data = req.body

    Trips.addTrip(data)
        .then(saved => {
            res.status(201).json(saved)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        })
})

module.exports = router;