const express = require("express");
const server = express.Router();
const { User, Order } = require("../db.js");
const passport = require("passport");
const passportJWT = require("passport-jwt");
const jwt = require ('jsonwebtoken')

server.post('/login', (req, res, next) => {
  passport.authenticate('local', {session: false}, (err, user) => {
         
        if(user) {
            console.log('AQUI EL USUARIO: ', user)
            const token = jwt.sign({user}, "secret");
            return res.status(200).json({ user, token })
        }
    }) 
    (req, res, next)
})


server.post("/logout", (req, res) => {
  console.log('TIPO DE SESSION',req.isAuthenticated());
  if (req.isAuthenticated()) {
    console.log("estaba logeado");
    req.logout();
    res.status(200).json("deslogueado");
});

server.get("/me", passport.authenticate('jwt',{session: false}),(req,res,next)=>{
    User.findAll({
        where: {id: req.user}, 
        include: [{model: Order}]
    })
    .then(user => {
        res.status(201).send(user)
    })
.catch(error => {
    res.status(400).send(error)
})
})

module.exports = server;
