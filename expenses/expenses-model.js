const db = require('../data/db-config');

module.exports = {
    findExpenses,
    findExpensesById,
    addExpenses
}

function findExpenses() {
    return db('expenses as e')
        .join('trips as t', 't.id', 'e.trip_id')
        .select('e.id', 'e.name', 'e.price', 'e.trip_id', 't.destination')
}

function findExpensesById(id) {
    return db('expenses as e')
        .join('trips as t', 't.id', 'e.trip_id')
        .select('e.id', 'e.name', 'e.price', 'e.trip_id', 't.destination')
        .where({"e.id": id})
}

function addExpenses(data) {
    return db('expenses').insert(data)
}