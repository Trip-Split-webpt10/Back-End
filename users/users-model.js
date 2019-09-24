const db = require('../data/db-config');

module.exports = {
    findBy,
    findById,
    findUserTrips,
    add,
    update,
    remove
}

function findBy(filter) {
    return db('users').where(filter)
}

function findById(id) {
    return db('users')
        .where({ id })
        .select('id', 'username', 'name').first()
}

function findUserTrips(user_id) {
    return db('user_trips as s')
        .join('users as u', 'u.id', 's.user_id')
        .join('trips as t', 't.id', 's.trip_id')
        .select('t.destination', 't.complete', 't.start_date', 't.end_date')
        .where({ user_id})
}

function add(user) {
    return db('users').insert(user)
        .then(newUser => {
            return findById(newUser[0])
        })
}

function update(changes, id) {
    return db('users').where({ id }).update(changes)
        .then(update => {
            return findById(id)
        })
}

function remove(id) {
    return db('users').where({ id }).del();
}