const express = require("express");
const {
  signup,
} = require("../controllers/usersControllers");
const {
  userSignupSchema,
} = require("../schemas/usersSchema");
const validationBody = require("../decoration/validationBody");

const router = express.Router();

router.post(
  "/signup",
  validationBody(userSignupSchema),
  signup
);

router.post("/login");

router.post("/logout");

router.get("/current");

module.exports = router;
