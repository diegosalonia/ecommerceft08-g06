const express = require("express");
const server = express.Router();
const { User, Order } = require("../db.js");
const passport = require("passport");
const passportJWT = require("passport-jwt");
const jwt = require ('jsonwebtoken')

// Google login
server.get("/google", passport.authenticate("google", {scope: ["profile", "email"],}));

server.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), (req, res) => {
  res.callback('/good');
});

server.post('/login', (req, res, next) => {
  passport.authenticate('local', {session: false}, (err, user) => {
         console.log("USER: ", user);
        if(user) {
            const token = jwt.sign({user}, "secret");
            return res.status(200).json({ user, token })
        }
    }) 
    (req, res, next)
})


server.post("/logout", passport.authenticate('jwt', { session: false }), (req, res, next) => {
  req.logout();
  res.sendStatus(200).send('usted esta deslogueado');  
})


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

server.put("/promote/:id", passport.authenticate('jwt', { session: false }), async (req, res) =>{
  const user = await User.findByPk(req.user)
  if(user.user_role === 'admin') {
  const user = await User.findByPk(req.params.id)
  user.user_role = "admin"
  user.save()
  .then(user=>{
    res.send(user)
  })
  .catch(err=>{
    res.send(err)
  })}

})

server.put("/user/promote/:id", passport.authenticate('jwt', { session: false }), async (req, res) =>{
  const user = await User.findByPk(req.user)
  if(user.user_role === 'admin') {
  const user = await User.findByPk(req.params.id)
  user.user_role = "user"
  user.save()
  .then(user=>{
    res.send(user)
  })
  .catch(err=>{
    res.send(err)
  })}

})

module.exports = server;
