const db = require('../data/db-config');

module.exports = {
    findTrips,
    findTripById,
    findTripExpenses,
    findTripUsers,
    findUserExpenses,
    addTrip,
    addUser,
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
        .then(newTrip => {
            return findTripById(newTrip[0])
        })
}

function findTripExpenses(trip_id) {
    return db('expenses as e')
        .join('trips as t', 't.id', 'e.trip_id')
        .select('e.id', 't.destination', 'e.name', 'e.price')
        .where({ trip_id })
}

function findTripUsers(trip_id) {
    return db('user_trips as u')
        .join('trips as t', 't.id', 'u.trip_id')
        .join('users as s', 's.id', 'u.user_id')
        .select('s.id', 's.name')
        .where({ trip_id })
}

function findUserExpenses(trip_id) {
    return db('expenses as e')
        .join('users as s', 's.id', 'x.user_id')
        .join('user_expenses as x', 'x.expense_id', 'e.id')
        .select('x.user_id', 's.name', 'x.expense_id', 'e.name as expense_name', 'x.amount', 'e.trip_id')
        .where({ trip_id })
}

function addUser(data) {
    return db('user_trips').insert(data)
}

function remove(id) {

}

function update(changes, id) {

}