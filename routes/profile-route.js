const router = require("express").Router();
//middware
const authCheck = (req, res, next) => {
  console.log("req.user", req.user);
  if (!req.isAuthenticated()) {
    res.redirect("/auth/login");
  } else {
    next();
  }
};

//not login,redirect
router.get("/", authCheck, (req, res) => {
  res.render("profile", { user: req.user });
});

module.exports = router;
