const Contact = require("../models/contactModel");

module.exports.getContacts = function () {
  return new Promise(function (resolve, reject) {
    Contact.find({}, function (err, contacts) {
      if (err) {
        reject(err);
      } else {
        resolve(contacts);
      }
    });
  });
};

module.exports.addContact = function (contactData) {
  return new Promise(function (resolve, reject) {
    let newContact = new Contact(contactData);

    newContact.save((err) => {
      if (err) {
        reject(err);
      } else {
        resolve("Contact successfully added");
      }
    });
  });
};

module.exports.getContactById = function (contactId) {
  return new Promise(function (resolve, reject) {
    Contact.findById(contactId, function (err, contact) {
      if (err) {
        reject(err);
      } else {
        resolve(contact);
      }
    });
  });
};

module.exports.updateContact = function (contactId, contactData) {
  return new Promise(function (resolve, reject) {
    Contact.findByIdAndUpdate(contactId, contactData, function (err, contact) {
      if (err) {
        reject(err);
      } else {
        resolve("Contact successfully updated");
      }
    });
  });
};

module.exports.deleteContact = function (contactId) {
  return new Promise(function (resolve, reject) {
    Contact.findByIdAndRemove(contactId, function (err, contact) {
      if (err) {
        reject(err);
      } else {
        resolve("Contact successfully deleted");
      }
    });
  });
};
