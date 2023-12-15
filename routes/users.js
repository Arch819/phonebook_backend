const express = require("express");
const { signup, signin } = require("../controllers/usersControllers");
const {
  userSignupSchema,
  userSigninSchema,
} = require("../schemas/usersSchema");
const authenticate = require("../middlewares/authenticate");
const validationBody = require("../decoration/validationBody");

const router = express.Router();

router.post("/signup", validationBody(userSignupSchema), signup);

router.post("/login", validationBody(userSigninSchema), signin);

router.post("/logout", authenticate);

router.get("/current", authenticate);

module.exports = router;
