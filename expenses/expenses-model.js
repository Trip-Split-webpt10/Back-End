const db = require('../data/db-config');

module.exports = {
    findExpenses,
    findExpensesById,
    findExpensesUsers,
    addExpenses,
    addUserExpense
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

function findExpensesUsers(expense_id) {
    return db('user_expenses as u')
        .join('expenses as e', 'e.id', 'u.expense_id')
        .join('users as s', 's.id', 'u.user_id')
        .select('s.id', 's.name', 'e.name as expense_name', 'u.amount')
        .where({ expense_id })
}

function addExpenses(data) {
    return db('user_expenses').insert(data)
}

function addUserExpense(data) {
    return db('user_expenses').insert(data)
}