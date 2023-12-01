const Contact = require("../db/models/contactModel");

const getContacts = async () => {
  const contacts = await Contact.find();
  return contacts;
};

const addedContact = async (data) => {
  const newContact = await Contact.create({ ...data });
  return newContact;
};

const deleteContact = async (contactId) => {
  const result = await Contact.findByIdAndDelete(contactId);
  return result;
};

module.exports = {
  getContacts,
  addedContact,
  deleteContact,
};
