const express = require("express");
const server = express.Router();
const { User } = require("../db.js");
const { Sequelize } = require("sequelize");
const passport = require("passport");
const passportJWT = require("passport-jwt");
const jwt = require ('jsonwebtoken')

server.post('/login', (req, res, next) => {
    passport.authenticate('local', {session:false}, (err, user) => {
        if(user) {
            console.log('AQUI EL USUARIO: ', user)
            const token = jwt.sign({user}, "secret");
            return res.status(200).json({ user, token });
        }
    }) 
    (req, res, next)
})

// server.post("/login", passport.authenticate("local", { session: false }), (req, res, next) => {
//    ((err, user, info) => {
//     if (user) {
//         req.login(user, { session: false }, (err) => {
//           if (err) {
//           return res.status(400).json({ error: "error al iniciar sesion" });
//         }
//         const token = jwt.sign({user}, "secret");
//         return res.status(200).json({ user, token });
//       });
//     } else {
//         console.log('aqui info: ', info)
//       return res.status(402).json({ info });
//     }
//   })(req, res, next)
// });

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

module.exports = server;
