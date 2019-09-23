const router = require('express').Router();

const Trips = require('./trips-model')

router.get('/', (req, res) => {
    Trips.findTrips()
        .then(trips => {
            trips.forEach(trip => {
                trip.complete = !!trip.complete

                // Trips.findTripExpenses(trip.id)
                //     .then(expenses => {
                //         Trips.findTripUsers(trip.id)
                //          .then(users => {
                //                 trip = {trip, expenses: expenses, users: users, totalUsers: users.length}
                //                 console.log(trip)
                //         })
                //     })
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

router.post('/:id/users', (req, res) => {
    const { id } = req.params;
    const data = req.body;
    const add = {data, trip_id: id}

    Trips.addUser(add)
        .then(user => {
            Trips.findTripUsers(id)
                .then(newUsers => {
                    res.status(201).json(newUsers)
                })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        })
})

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