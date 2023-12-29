const Contact = require("../db/models/contactModel");

const getContacts = async (owner) => {
  const contacts = await Contact.find({ owner });
  return contacts;
};

const addedContact = async (data, owner) => {
  const newContact = await Contact.create({ ...data, owner });
  return newContact;
};

const deleteContact = async (contactId, owner) => {
  const result = await Contact.findOneAndDelete({ _id: contactId, owner });
  return result;
};

module.exports = {
  getContacts,
  addedContact,
  deleteContact,
};
