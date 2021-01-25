const server = require('express').Router();
const { User } = require('../db.js');
const { Sequelize } = require('sequelize');

server.get('/', (req, res, next) => {
    User.findAll()
    .then(response =>{
        res.send(response)
    })
    .catch(next)
});

server.post('/', (req, res) => {
    User.create(req.body.form)
    .then(response => {
        res.send(response)
    })
    .catch(err =>{
        res.send(err)
    })
});

server.put('/:userId', async (req, res) => {
    const user = await User.findByPk(req.params.userId)
    Object.assign(user, req.body.form)

    user.save()
    .then(response =>{
        res.send(response)
    })
    .catch(err => {
        res.send(err)
    })
});


module.exports = server;
