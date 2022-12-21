const router = require("express").Router();
const Post = require("../models/post-model");
//middware
const authCheck = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.returnTo = req.originalUrl;
    res.redirect("/auth/login");
  } else {
    next();
  }
};

//not login,redirect
router.get("/", authCheck, async (req, res) => {
  let postFound = await Post.find({
    author: req.user._id,
  });
  console.log("postFound", postFound);
  res.render("profile", { user: req.user, posts: postFound });
});

router.get("/post", authCheck, (req, res) => {
  res.render("post", { user: req.user });
});

router.post("/post", authCheck, async (req, res) => {
  let { title, content } = req.body;
  console.log("title", req.body);
  let newPost = new Post({ title, content, author: req.user._id });
  try {
    await newPost.save();
    res.status(200).redirect("/profile");
  } catch (err) {
    console.log("err", err);
    req.flash("error_msg", "Both title and content are required");
    res.redirect("/profile/post");
  }
});

module.exports = router;
