const express = require("express");
const server = express.Router();
const { User } = require("../db.js");
const passport = require("passport");
const passportJWT = require("passport-jwt");
const jwt = require ('jsonwebtoken')

server.post('/login', (req, res, next) => {
    passport.authenticate('local', {session:false}, (err, user) => {
        if(user) {
            const token = jwt.sign({user}, "secret");
            return res.status(200).json({ user, token });
        }
    }) 
    (req, res, next)
})

server.post("/logout", (req, res) => {
  console.log(req.isAuthenticated());
  if (req.isAuthenticated()) {
    console.log("estaba logeado");
    req.logout();
    res.sendStatus(200);
  } else {
    res.status(400).send("No estabas logeado :/");
  }
});

server.get("/me", passport.authenticate('jwt',{session: false}),(req,res,next)=>{
    User.findByPk(req.user)
    .then(user => {
		res.json(user);
	})
	.catch(err=>{
		res.send(err);
	})
})

module.exports = server;
