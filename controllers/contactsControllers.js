const services = require("../services/contactsServices");

const getContactsController = async (req, res, next) => {
  const result = await services.getContacts();
  res.json(result);
};

const addedContactController = async (req, res) => {
  const result = await services.addedContact(req.body);
  res.status(201).json(result);
};

const deleteContactController = async (req, res) => {
  const { contactId } = req.params;
  const result = await services.deleteContact(contactId);
  if (!result) {
    res.status(404).json({ message: "Not found" });
    return;
  }
  res.json({ message: "The contact was successfully deleted" });
};

module.exports = {
  getContactsController,
  addedContactController,
  deleteContactController,
};
