const router = require('express').Router();
const bcrypt = require('bcryptjs');

const Users = require('./users-model');

router.get('/:id', (req, res) => {
    const { id } = req.params;

    Users.findById(id)
        .then(user => {
            if (user) {
                res.json(user);
            } else {
                res.status(404).json({
                    message: 'Could not find user by that id'
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                message: 'Failed to get user'
            })
        })
})

router.post('/register', (req, res) => {
    let user = req.body;
    const hash = bcrypt.hashSync(user.password, 10);
    user.password = hash;

    Users.add(user)
        .then(saved => {
            res.status(201).json(saved)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        })
})

router.post('/login', (req, res) => {
    let { username, password } = req.body;

    Users.findBy({ username })
        .first()
        .then(user => {
            if (user && bcrypt.compareSync(password, user.password)) {
                res.status(200).json({
                    message: 'You have successfully logged in'
                })
            } else {
                res.status(401).json({
                    message: 'Incorrect username or password'
                })
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        })
})

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;
    let user = req.body;
    const hash = bcrypt.hashSync(user.password, 10);
    user.password = hash;

    Users.findById(id)
        .then(user => {
            if (user) {
                Users.update(changes, id)
                    .then(updatedUser => {
                        res.json(updatedUser)
                    })
                    .catch(err => {
                        console.log(err)
                        res.status(500).json(err)
                    })
            } else {
                res.status(404).json({
                    message: 'Could not find user with given id'
                })
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        })
})

module.exports = router;