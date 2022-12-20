const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    minLength: 1,
    require: true,
  },
  content: {
    type: String,
    minLength: 1,
    require: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  author: {
    type: String,
  },
});

module.exports = mongoose.model("Post", postSchema);
