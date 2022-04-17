const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// create a user schema.
const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});

// map the user schema to a collection in the database named 'users'
const User = mongoose.model("users", userSchema);

module.exports = User;
