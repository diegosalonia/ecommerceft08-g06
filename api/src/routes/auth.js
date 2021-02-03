const express = require('express');
const server = express.Router();
const { User } = require('../db.js');
const { Sequelize } = require('sequelize');
const passport = require('passport');


server.post('/login', passport.authenticate('local'), (req, res) => {
        console.log("me estoy logeando!")
        res.send(req.user);
    }
);

server.post('/logout', (req, res) => {
    console.log("me estoy deslogeando!")
    req.logout();
    res.redirect('http://127.0.0.1:3001/products/1');
}
);

module.exports = server;

