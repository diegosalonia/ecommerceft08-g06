const server = require('express').Router();
const { Category } = require('../db.js');

server.post('/', (req, res) =>{
    Category.create(req.body)
    .then(category => {
        res.status(200).send(category)
    })
})

module.exports = server;
