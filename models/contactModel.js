const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// create a user schema.
const contactSchema = new Schema({
  contactName: {
    type: String,
    required: true,
  },
  contactNumber: {
    type: String,
    required: true,
  },
  contactEmail: {
    type: String,
    required: true,
  },
});

// map the user schema to a collection in the database named 'users'
const Contact = mongoose.model("contacts", contactSchema);

module.exports = Contact;
