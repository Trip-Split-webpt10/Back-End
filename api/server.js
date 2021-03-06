const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

const usersRouter = require('../users/user-router');
const tripsRouter = require('../trips/trips-router');
const expenseRouter = require('../expenses/expenses-router');
const restricted = require('../users/authenticate');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api/users', usersRouter);
server.use('/api/trips', tripsRouter);
server.use('/api/expenses', expenseRouter);

server.get('/', (req, res) => {
    res.send("It must be working!!")
})

module.exports = server;