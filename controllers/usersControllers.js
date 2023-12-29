const User = require("../db/models/user.js");
const gravatar = require("gravatar");
const jwt = require("jsonwebtoken");
const path = require("path");
const fs = require("fs/promises");

const { SECRET_KEY } = process.env;
const avatarDir = path.join(
  __dirname,
  "../",
  "public",
  "photo"
);

const signup = async (req, res) => {
  const { name, email, password } = req.body;
  const userFind = await User.findOne({ email });

  if (userFind) {
    res
      .status(409)
      .json({ message: "User with this email registered" });
    return;
  }
  const photo = gravatar.url(email);

  const newUser = new User({
    name,
    email,
    password,
    photo,
  });

  await newUser.hashPassword();
  await newUser.save();

  const payload = {
    id: newUser._id,
  };

  const token = jwt.sign(payload, SECRET_KEY);
  await User.findByIdAndUpdate(newUser._id, { token });

  res
    .status(201)
    .json({ token, user: { email, name, photo } });
};

const signin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    res
      .status(401)
      .json({ message: "Email or password is invalid" });
    return;
  }

  const checkPassword = await user.checkPassword(password);
  if (!checkPassword) {
    res
      .status(401)
      .json({ message: "Email or password is invalid" });
    return;
  }
  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, SECRET_KEY);
  await User.findByIdAndUpdate(user._id, { token });

  res.json({
    token,
    user: { email, name: user.name, photo: user.photo },
  });
};

const logout = async (req, res) => {
  const { _id } = req.user;

  await User.findByIdAndUpdate(_id, {
    token: "",
  });

  res.sendStatus(204);
};

const getCurrent = (req, res) => {
  const { email, name, photo } = req.user;

  res.json({ email, name, photo });
};

const updatePhoto = async (req, res) => {
  const { _id } = req.user;
  const { path: tempUpload, originalname } = req.file;
  const filename = `${_id}_${originalname}`;
  const resultUpdate = path.join(avatarDir, filename);
  await fs.rename(tempUpload, resultUpdate);

  const avatarURL = path.join("avatars", filename);

  await User.findByIdAndUpdate(_id, { avatarURL });

  res.json({ avatarURL });
};

module.exports = {
  signup,
  signin,
  logout,
  getCurrent,
  updatePhoto,
};
