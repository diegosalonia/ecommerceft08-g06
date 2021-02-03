const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const routes = require('./routes/index.js');
const JwtStrategy = require('passport-jwt').Strategy, ExtractJwt = require('passport-jwt').ExtractJwt;

require('./db.js');

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

server.use('/', routes);

//

// const opts = {}
// opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
// opts.secretOrKey = 'secret';

// passport.use(new JwtStrategy
  // header ={
  //   "typ": "JWT",
  //   "alg": "RS256",
  // }

  // payload = {
  //   "aud": "https://mycompany.com/mi-app",
  //   "iss": "https://sts.windows.net/common/",
  //   "sub": "asdasd34asf2332r23fea",
  //   "iat": 1552212046,
  //   "nbf": 1552212046,
  //   "exp": 1552215946,
  //   "family_name": "Pil",
  //   "given_name": "Paco",
  //   "ipaddr": "10.0.0.1",
  //   "name": "Paco Pil"
  // }

//   (opts, function(jwt_payload, done) {
//   User.findOne({id: jwt_payload.sub}, function(err, user) {
//       if (err) {
//           return done(err, false);
//       }
//       if (user) {
//           return done(null, user);
//       } else {
//           return done(null, false);
//           // or you could create a new account
//       }
//   });
// }));
passport.use(new LocalStrategy(  
  
   function(email, password, done) {
     const isValid = validPassword(password)
     {
       usernameField: 'email',
       passwordField: "password"
     }
       User.findOne({ email: email })
           .then((user) => {
               if (!user) { return done(null, false, {msg: 'User Not Found'} ) }
              
               if (isValid) {
                   return done(null, user, {msg: 'Login Successfull'});
               } else {
                   return done(null, false, {msg: 'wrong password'});
               }
           })
           .catch((err) => {   
               cb(err);
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
