const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const authRoute = require("./routes/auth-route");
const profileRoute = require("./routes/profile-route");
const passport = require("passport");
require("./config/passport");
const MongoDbId = process.env.MongoDB_URL;

const cookieSession = require("cookie-session");
mongoose
  .connect(MongoDbId)
  .then(() => {
    console.log("Connected to MongoDB atlas.");
  })
  .catch((err) => {
    console.log("Connected Failed.");
    console.log(err);
  });

//middware
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cookieSession({
    keys: [process.env.SECRET],
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", authRoute);
app.use("/profile", profileRoute);

app.get("/", (req, res) => {
  res.render("index", { user: req.user });
});

app.listen(8080, () => {
  console.log("server running on 8080.");
});
