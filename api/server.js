const express = require('express');
const cors = require('cors')
const helmet = require('helmet')
require('dotenv').config()

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.get('/', (req, res) => {
    res.send("It must be working!!")
})

module.exports = server;