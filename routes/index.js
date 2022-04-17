var express = require("express");
var router = express.Router();
var contactService = require("../controllers/index");
const { ensureAuthenticated } = require("../config/authGaurd");

/* Pages Routes */
router.get("/", function (req, res, next) {
  res.render("pages/index", { title: "Home" });
});

router.get("/projects", function (req, res, next) {
  res.render("pages/projects", { title: "Projects" });
});

router.get("/services", function (req, res, next) {
  res.render("pages/services", { title: "Services" });
});

router.get("/about", function (req, res, next) {
  res.render("pages/about", { title: "About" });
});

router.get("/contact", function (req, res, next) {
  res.render("pages/contact", { title: "Contact" });
});

router.get("/contactList", ensureAuthenticated, function (req, res, next) {
  contactService
    .getContacts()
    .then((contacts) => {
      if (contacts.length > 0) {
        res.render("pages/contactList", {
          title: "Contact List",
          contacts: contacts,
          message: "",
        });
      } else {
        res.render("pages/contactList", {
          title: "Contact List",
          contacts: [],
          message: "No contacts found",
        });
      }
    })
    .catch((err) => {
      res.render("pages/contactList", {
        title: "Contact List",
        contacts: [],
        message: "We are having some issues",
      });
    });
});

router.get("/addContact", ensureAuthenticated, function (req, res, next) {
  res.render("pages/addContact", { title: "Add Contact" });
});

router.post("/addContact", ensureAuthenticated, function (req, res, next) {
  contactService
    .addContact(req.body)
    .then(() => {
      res.redirect("/contactList");
    })
    .catch((err) => {
      res.status(500).send("Unable to add contact" + err);
    });
});

router.get("/editContact/:id", ensureAuthenticated, function (req, res, next) {
  contactService
    .getContactById(req.params.id)
    .then((contact) => {
      res.render("pages/updateContact", {
        title: "Edit Contact",
        contact: contact,
      });
    })
    .catch((err) => {
      res.status(500).send("Unable to edit contact" + err);
    });
});

router.post("/editContact/:id", ensureAuthenticated, function (req, res, next) {
  contactService
    .updateContact(req.params.id, req.body)
    .then(() => {
      res.redirect("/contactList");
    })
    .catch((err) => {
      res.status(500).send("Unable to edit contact" + err);
    });
});

router.get(
  "/deleteContact/:id",
  ensureAuthenticated,
  function (req, res, next) {
    contactService
      .deleteContact(req.params.id)
      .then(() => {
        res.redirect("/contactList");
      })
      .catch((err) => {
        res.status(500).send("Unable to delete contact" + err);
      });
  }
);

module.exports = router;
