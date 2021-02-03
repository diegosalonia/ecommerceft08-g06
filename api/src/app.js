const express = require('express');
//const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const routes = require('./routes/index.js');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const {User} = require('./db.js');

const server = express();

server.name = 'API';

server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json({ limit: '50mb' }));
server.use(cookieParser());
server.use(morgan('dev'));
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  //ToDo resolve origin conflicts. 
  // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');

  next();
});

// server.use(session({
//   secret: "secretisimo",
//   resave: false,
//   saveUninitialized: true,
//   store: sessionStore 
// }));

server.use(passport.initialize())
server.use(passport.session());
server.use(express.urlencoded({extended: true}));

server.use('/', routes);

passport.serializeUser(function(user, cb) {
  cb(null, user.id);
});passport.deserializeUser(function(id, cb) {
  User.findById(id, function (err, user) {
      if (err) { return cb(err); }
      cb(null, user);
  });
});

passport.use(new LocalStrategy(    
  {
    usernameField: 'email',
    passwordField: 'password'
  },
  function(email, password, done) {
    User.findOne({ 
      where: {
        email: email
        } })
    .then((user) => {
      if (!user || !user.correctPassword(password)) { 
        return done(null, false, {msg: 'User or password incorrect'})
      }
        return done(null, user, {msg: 'Login Successfull'});
    })
           .catch((err) => {   
             done(err);
            });
          }));
          
// Error catching endware.
server.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});


module.exports = server;
