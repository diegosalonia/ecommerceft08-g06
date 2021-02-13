var JWTStrategy = require('passport-jwt').Strategy,
    ExtractJWT = require('passport-jwt').ExtractJwt;
const LocalStrategy = require("passport-local").Strategy;
const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const GitHubStrategy = require('passport-github').Strategy;
const passportJWT = require("passport-jwt");
const passport = require("passport");
const BearerStrategy = require("passport-http-bearer").Strategy
const { User } = require("../db.js");
const  jwt = require('jsonwebtoken')

const {
    secret,
	googleClientID,
	googleClientSecret,
	githubClientID,
	githubClientSecret,
	facebookClientID,
	facebookClientSecret
} = process.env;



passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey   : secret
    },
    function (jwtPayload, next) {
        User.findByPk( jwtPayload.id || jwtPayload.user.id )
        .then(user => {
            next(null, user.id);
        })
        .catch(err => {
            next(err);
        });
    }
))

passport.serializeUser((user, next) => next(null, user));

passport.deserializeUser((user, next) => {
  next(null, user);
})

passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
        session: false
      },
      async (email, password, next) => {
        await User.findOne({
          where: {
            email: email,
          },
        })
          .then((user) => {
            if (!user || !user.correctPassword(password)) {
              next(null, false, { message: "User or password incorrect" });
            } else { 
            next(null, user, { message: "Login Successfull" });
            }
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
            callbackURL: 'http://localhost:3000/auth/google/callback',
            session: false
          },
      async function (accessToken, refreshToken, profile, done) {
        try {
          const user = {
            first_name: profile.name.givenName,
            last_name: profile.name.familyName,
            email: profile.email
          }
          console.log('AQUI USUARIO: ',user)
          if (foundUser) {
              const updatedUser = await foundUser.update(user);
              done(null, updatedUser)
          }
          else {
              const createdUser = await User.create(user)
              done(null, createdUser)
              
          }
      } catch (err) {
          done(err, null)
      }
  }));

  passport.use(
    new FacebookStrategy(
        {
            clientID: facebookClientID,
            clientSecret: facebookClientSecret,
          callbackURL: 'http://localhost:3000/auth/facebook/callback',
          profileFields : [ 'emails', 'first_name', 'last_name' ],
          session: false
        },
    async function (accessToken, refreshToken, profile, done) {
      try {
        const user = {
          first_name: profile.name.givenName,
          last_name: profile.name.familyName,
          email: profile.emails[0].value,
        }
        const foundUser = await User.findOne({ where: { email: user.email } })
        if (foundUser) {
            const updatedUser = await foundUser.update(user);
            console.log('FOUNDUSER: ',foundUser)
            done(null, updatedUser)
        }
        else {
            const createdUser = await User.create(user)
            console.log('USUARIO CREADO: ', user)
            done(null, createdUser)
            
        }
    } catch (err) {
        done(err, null)
    }
}));

passport.use(
    new GitHubStrategy(
        {
            clientID: githubClientID,
            clientSecret: githubClientSecret,
          callbackURL: 'http://localhost:3000/auth/github/callback',
          session: false
        },
    async function (accessToken, refreshToken, profile, done) {
      console.log('AQUI PROFILE: ', profile)
      try {
        const user = {
          first_name: profile.displayName,
          last_name: '-',
          email: profile.emails[0].value
        }
        console.log('AQUI USUARIO: ',user)
        const foundUser = await User.findOne({ where: { email: user.email } })
        if (foundUser) {
            const updatedUser = await foundUser.update(user);
            console.log('FOUNDUSER: ',foundUser)
            done(null, updatedUser)
        }
        else {
            const createdUser = await User.create(user)
            console.log('USUARIO CREADO: ', user)
            done(null, createdUser)
            
        }
    } catch (err) {
        done(err, null)
    }
}));

  passport.use(
    new BearerStrategy((token, done) => {
      jwt.verify(token, "secret", (err, user) => {
        if (err) return done(err);
        return done(null, user ? user : false);
      });
    })
  );

  module.exports = passport;
