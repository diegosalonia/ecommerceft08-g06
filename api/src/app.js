require('dotenv').config();
const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const routes = require("./routes/index.js");
const passport = require("passport");
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const LocalStrategy = require("passport-local").Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const { User } = require("./db.js");

const {
	googleClientID,
	googleClientSecret,
	githubClientID,
	githubClientSecret,
	facebookClientID,
	facebookClientSecret
} = process.env;

const server = express();

server.name = "API";

server.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
server.use(bodyParser.json({ limit: "50mb" }));
server.use(cookieParser());
server.use(morgan("dev"));
server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", req.headers.origin);
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

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: "secret",
    },
    function (jwtPayload, next) {
      console.log("aqui payload: ", jwtPayload);
      User.findByPk(jwtPayload.user.id)
        .then((user) => {
          next(null, user);
        })
        .catch((err) => {
          next(err);
        });
    }
  )
);

passport.serializeUser((user, next) => next(null, user.id));

passport.deserializeUser((id, next) => {
  User.findByPk(id)
    .then((user) => next(null, user))
    .catch((err) => next(err, null));
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

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, next) => {
      await User.findOne({
        where: {
          email: email,
        },
      })
        .then((user) => {
          if (!user || !user.correctPassword(password)) {
            next(null, false, { msg: "User or password incorrect" });
          }
          next(null, user, { msg: "Login Successfull" });
        })
        .catch((err) => {
          next(err);
        });
    }
  )
);

passport.use(
	new GoogleStrategy(
		{
			clientID: googleClientID,
			clientSecret: googleClientSecret,
			callbackURL: 'http://localhost:3001/auth/google/callback'
		},
		async (accessToken, refreshToken, profile, next) => {
      console.log('aqui un nuevo user: ', user)
      const [User, created] = await User.findOrCreate({
        where: {googleId: profile.id},
        defaults: {name: profile.displayName, email: profile.emails[0].value}
      })
      .then((user) => {
        console.log('que tiene el user: ', user)
				if (!user) return next(null, false, {message: 'We could not log you in with that account'});

				return next(null, user);
      }) 
      .catch ((err) => {
				next(err);
			})
		}
	)
);

// Error catching endware.
server.use((err, req, res, next) => {
  // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;
