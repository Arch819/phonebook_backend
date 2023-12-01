const express = require("express");
const ctrl = require("../controllers/contactsControllers");
const router = express.Router();
const contactSchema = require("../schemas/contactsSchema");
const validationBody = require("../decoration/validationBody");
const validationId = require("../middlewares/validationId");

router.get("/", ctrl.getContactsController);

router.post("/", validationBody(contactSchema), ctrl.addedContactController);

router.delete("/:contactId", validationId, ctrl.deleteContactController);

module.exports = router;
