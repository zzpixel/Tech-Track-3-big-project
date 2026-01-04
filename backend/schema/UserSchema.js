const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: false,
  },
  likesMovies: {
    type: Boolean,
    required: false
  },
  likesTV: {
    type: Boolean,
    required: false,
  },
  VideoGames: {
    type: Boolean,
    required: false,
  },
  GenresLiked: {
    type: Array,
  }
});

const userSchematic = mongoose.model('User', userSchema);
module.exports = userSchematic;