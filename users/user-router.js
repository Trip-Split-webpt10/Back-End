const router = require('express').Router();
const bcrypt = require('bcryptjs');
const generateToken = require('./generateToken')

const Users = require('./users-model');

// Get endpoint that shows a list of all users. Does not return the password. /api/users
router.get('/', (req, res) => {
    Users.findUsers()
        .then(users => {
            res.send(users)
        })
        .catch(err => {
            res.status(500).json({
                message: 'Failed to get users'
            })
        })
})

// Get endpoint that returns the data of a specific user. Does not return the password. /api/users
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

//Get endpoint that shows all trips tied to a specific user. /api/users/:id/trips
router.get('/:id/trips', (req, res) => {
    const { id } = req.params

    Users.findUserTrips(id) 
        .then(trips => {
            res.json(trips)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                message: "Failed to get user trips"
            })
        })
})

// Post endpoint that adds a new user to the db. /api/users/register
router.post('/register', (req, res) => {
    let user = req.body;
    const hash = bcrypt.hashSync(user.password, 10);
    user.password = hash;

    Users.add(user)
        .then(saved => {
            const token = generateToken(saved)
            res.status(201).json({saved, token})
        })
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        })
})

// Post endpoint for logging a user into the app. /api/user/login
router.post('/login', (req, res) => {
    let { username, password } = req.body;

    Users.findBy({ username })
        .first()
        .then(user => {
            if (user && bcrypt.compareSync(password, user.password)) {
                const token = generateToken(user)
                delete user.password
                res.status(200).json({
                    user,
                    message: 'You have successfully logged in',
                    token
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

// Put endpoint for editing a user. /api/user/:id
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