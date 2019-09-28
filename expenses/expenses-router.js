const router = require('express').Router();

const Expenses = require('./expenses-model');

//Get endpoint for get a list of all expenses. /api/expenses
router.get('/', (req, res) => {
    Expenses.findExpenses()
        .then(expenses => {
            res.send(expenses)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                message: "Unable to get list of expenses"
            })
        })
})

// Get endpoint for getting the data of a single expense. /api/expenses/:id
router.get('/:id', (req, res) => {
    const { id } = req.params

    Expenses.findExpensesById(id)
        .then(expense => {
            Expenses.findExpensesUsers(id)
                .then(users => {
                    res.send({expense, users: users})
                })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                message: "Unable to get expense"
            })
        })
})

//Get endpoint for showing the users tied to an expense. /api/expenses/:id/users
router.get('/:id/users', (req, res) => {
    const { id } = req.params

    Expenses.findExpensesUsers(id)
        .then(users => {
            res.send(users)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                message: "Unable to get expense"
            })
        })
})

// Post endpoint for adding a new expense. /api/expenses
router.post('/', (req, res) => {
    const data = req.body

    Expenses.addExpenses(data)
        .then(saved => {
            res.status(201).json(saved)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        })
})

// Post endpoint for adding a user to an expense. /:id/users
router.post('/:id/users', (req, res) => {
    const { id } = req.params;
    const { amount, user_id } = req.body;
    const add = {amount:amount, user_id: user_id, expense_id: id}

    Expenses.addUserExpense(add)
        .then(expense => {
            Expenses.findExpensesUsers(id)
                .then(newExpense => {
                    res.status(201).json(newExpense)
                })
        })
        .catch(err => {
            console.log(err, add)
            res.status(500).json(err)
        })
})

module.exports = router;