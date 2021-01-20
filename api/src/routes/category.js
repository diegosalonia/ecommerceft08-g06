const server = require('express').Router();
const { Category } = require('../db.js');

server.post('/', (req, res) =>{
    Category.create(req.body.form)
    .then(category => {
        res.status(200).send(category)
    })
    .catch(
})

module.exports = server;
