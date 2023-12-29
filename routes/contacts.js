const express = require("express");
const ctrl = require("../controllers/contactsControllers");
const router = express.Router();
const contactSchema = require("../schemas/contactsSchema");
const validationBody = require("../decoration/validationBody");
const validationId = require("../middlewares/validationId");
const authenticate = require("../middlewares/authenticate");

router.get("/", authenticate, ctrl.getContactsController);

router.post(
  "/",
  authenticate,
  validationBody(contactSchema),
  ctrl.addedContactController
);

router.delete(
  "/:contactId",
  authenticate,
  validationId,
  ctrl.deleteContactController
);

module.exports = router;
