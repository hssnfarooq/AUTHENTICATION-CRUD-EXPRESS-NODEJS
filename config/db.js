// connect to mongodb
var mongoose = require("mongoose");

let mongoDBConnectionString = process.env.MONGO_URI;

module.exports.connect = function () {
  return new Promise(function (resolve, reject) {
    mongoose
      .connect(mongoDBConnectionString, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log("Connected to mongodb");
        resolve();
      })
      .catch((err) => {
        console.log("Error connecting to mongodb");
        reject(err);
      });
  });
};
