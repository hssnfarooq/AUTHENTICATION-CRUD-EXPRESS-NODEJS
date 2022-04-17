const User = require("../models/userModel");
const bcrypt = require("bcryptjs");

module.exports.registerUser = function (userData) {
  return new Promise(function (resolve, reject) {
    bcrypt
      .hash(userData.password, 10)
      .then((hash) => {
        userData.password = hash;

        let newUser = new User(userData);

        newUser.save((err) => {
          if (err) {
            if (err.code == 11000) {
              reject("User Name already taken");
            } else {
              reject("There was an error creating the user: " + err);
            }
          } else {
            resolve("User " + userData.userName + " successfully registered");
          }
        });
      })
      .catch((err) => reject(err));
  });
};
