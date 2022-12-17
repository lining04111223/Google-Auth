const passport = require("passport");
var GoogleStrategy = require("passport-google-oauth20");
const User = require("../models/user-model");

passport.serializeUser((user, done) => {
  console.log("Serialize");
  done(null, user._id);
});

passport.deserializeUser((_id, done) => {
  console.log("Deserializing user now");
  User.findById({ _id }).then((user) => {
    console.log("find user");
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.Google_client_id,
      clientSecret: process.env.google_client_secret,
      callbackURL: "/auth/google/redirect",
    },
    (accessToken, refreshToken, profile, done) => {
      console.log(profile);
      User.findOne({ googleID: profile.id }).then((foundUser) => {
        if (foundUser) {
          console.log("User already exist");
          done(null, foundUser);
        } else {
          new User({
            name: profile.displayName,
            googleID: profile.id,
            thumbnail: profile.photos[0].value,
          })
            .save()
            .then((newUser) => {
              console.log("new user created.");
              done(null, newUser);
            });
        }
      });
    }
  )
);
