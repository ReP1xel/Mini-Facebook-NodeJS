const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const credentials = require('../credentials')

passport.serializeUser(function (user, done) { done(null, user); });
passport.deserializeUser(function (user, done) { done(null, user); });
passport.use(
    new GoogleStrategy(
        {
            clientID: credentials.client_id,
            clientSecret: credentials.client_secret,
            callbackURL: credentials.callback_url,
        },
        function (accessToken, refreshToken, profile, done) {
            return done(null, profile);
        }
    )
);