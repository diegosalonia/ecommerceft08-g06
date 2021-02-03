const express = require('express');
const server = express.Router();
const { User } = require('../db.js');
const { Sequelize } = require('sequelize');
const passport = require('passport');


server.post('/login', passport.authenticate('jwt'), (req, res) => {
        console.log("me estoy logeando!")
        res.send(req.user);
    }
);

server.post('/logout', (req, res) => {
    console.log(req.isAuthenticated())
	if (req.isAuthenticated()) {
        console.log("estaba logeado")
		req.logout();
		res.sendStatus(200);
	}
    else {res.status(400).send('No estabas logeado :/')};
}
)


module.exports = server;

