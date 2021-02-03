const express = require('express');
const server = express.Router();
const { User } = require('../db.js');
const { Sequelize } = require('sequelize');
const passport = require('passport');


server.post('/login', passport.authenticate('local'), (req, res) => {
        res.send(req.user);
    }
);


module.exports = server;

