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
    return db('users').where({ id }).first()
}

function add(user) {
    return db('users').insert(user)
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