const passport = require("passport");
var GoogleStrategy = require("passport-google-oauth20");

passport.use(
  new GoogleStrategy({
    clientID: process.env.Google_client_id,
    clientSecret: process.env.google_client_secret,
    callbackURL: "/auth/google/redirect",
  })
);
