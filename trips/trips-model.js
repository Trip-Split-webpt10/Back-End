const db = require('../data/db-config');

module.exports = {
    findTrips,
    findTripById,
    findTripExpenses,
    addTrip,
    remove,
    update
}

function findTrips() {
    return db('trips')
}

function findTripById(id) {
    return db('trips').where({ id }).first()
}

function addTrip(data) {
    return db('trips').insert(data)
}

function findTripExpenses(trip_id) {
    return db('expenses as e')
        .join('trips as t', 't.id', 'e.trip_id')
        .select('e.id', 't.destination', 'e.name', 'e.price')
        .where({ trip_id })
}

function remove(id) {

}

function update(changes, id) {

}