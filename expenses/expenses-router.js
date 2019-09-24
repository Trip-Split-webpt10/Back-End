const router = require('express').Router();

const Expenses = require('./expenses-model');

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

router.post('/', (req, res) => {
    const data = req.body

    Expenses.addExpenses(data)
        .then(saved => {
            Expenses.findExpensesById(id)
                .then(newExpense => {
                    res.status(201).json(newExpense)
                })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        })
})

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