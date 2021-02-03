const server = require('express').Router();
const { User } = require('../db.js');
const { Sequelize } = require('sequelize');

server.post('.')

app.post('/login', passport.authenticate('jwt', { session: false }),
    function(req, res) {
        res.send(req.user.login);
    }
);