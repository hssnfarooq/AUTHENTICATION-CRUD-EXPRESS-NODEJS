var express = require("express");
var router = express.Router();
var userService = require("../controllers/users");
const passport = require("passport");

/* Users routes */

router.get("/login", function (req, res, next) {
  res.render("pages/login", { title: "Login" });
});

router.post("/login", function (req, res, next) {
  passport.authenticate("local", {
    successRedirect: "/contactList",
    failureRedirect: "/users/login",
  })(req, res, next);
});

router.get("/register", function (req, res, next) {
  res.render("pages/register", { title: "Signup" });
});

router.post("/register", function (req, res, next) {
  userService
    .registerUser(req.body)
    .then((result) => {
      res.redirect("/users/login");
    })
    .catch((err) => {
      res.send(err);
    });
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/users/login");
});

module.exports = router;
