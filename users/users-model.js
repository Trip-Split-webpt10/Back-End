const db = require('../data/db-config');

module.exports = {
    findBy,
    findById,
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