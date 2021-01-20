const server = require('express').Router();
const { Category } = require('../db.js');

server.post('/', (req, res) =>{
    Category.create(req.body.form)
    .then(category => {
        res.status(200).send(category)
    })
    .catch(error =>{
        res.status(400).send(error)
    })
})

module.exports = server;
