const express = require("express");
const {
  signup,
  signin,
  logout,
  getCurrent,
  updatePhoto,
} = require("../controllers/usersControllers");
const {
  userSignupSchema,
  userSigninSchema,
} = require("../schemas/usersSchema");
const authenticate = require("../middlewares/authenticate");
const validationBody = require("../decoration/validationBody");
const upload = require("../middlewares/upload");

const router = express.Router();

router.post(
  "/signup",
  validationBody(userSignupSchema),
  signup
);

router.post(
  "/login",
  validationBody(userSigninSchema),
  signin
);

router.post("/logout", authenticate, logout);

router.get("/current", authenticate, getCurrent);

router.patch(
  "/photo",
  authenticate,
  upload.single("avatar"),
  updatePhoto
);

module.exports = router;
