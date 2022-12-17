const { Schema, model, default: mongoose } = require("mongoose");

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    minLength: 6,
    maxLength: 255,
  },

  googleID: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },

  thumbnail: {
    type: String,
  },
  //local login

  email: {
    type: String,
  },

  password: {
    type: String,
  },
});

module.exports = mongoose.model("User", userSchema);
