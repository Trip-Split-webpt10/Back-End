const router = require('express').Router();

const Trips = require('./trips-model')

router.get('/', (req, res) => {
    Trips.findTrips()
        .then(trips => {
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
            res.send(trip)
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