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
            res.send(expense)
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
            res.status(201).json(saved)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        })
})

module.exports = router;