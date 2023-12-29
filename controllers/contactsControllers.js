const services = require("../services/contactsServices");

const getContactsController = async (req, res, next) => {
  const { _id } = req.user;
  const result = await services.getContacts(_id);
  res.json(result);
};

const addedContactController = async (req, res) => {
  const { _id } = req.user;
  const result = await services.addedContact(req.body, _id);
  res.status(201).json(result);
};

const deleteContactController = async (req, res) => {
  const { _id } = req.user;
  const { contactId } = req.params;
  const result = await services.deleteContact(contactId, _id);
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
