require('dotenv').config();
const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const routes = require("./routes/index.js");
const passport = require("passport");
require("./middlewares/passport");

const server = express();

server.name = "API";

server.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
server.use(bodyParser.json({ limit: "50mb" }));
server.use(cookieParser());
server.use(morgan("dev"));
server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", '*');
  //ToDo resolve origin conflicts.
  // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");

  next();
});
server.all("*", function (req, res, next) {
  passport.authenticate("bearer", (err, user) => { 
    if (err) return next(err);
    if (user) { req.user = user; }
    return next(); 
  }) (req, res, next);
});


server.use(cookieParser("secret"));
server.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
  })
);

server.use(passport.initialize());
server.use(passport.session());
server.use("/", routes);

server.use((req, res, next) => {
   next();
});

// Error catching endware.
server.use((err, req, res, next) => {  // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;
