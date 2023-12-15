const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    token: String,
    photo: String,
  },
  { versionKey: false }
);

userSchema.methods.hashPassword = async function () {
  this.password = await bcrypt.hash(this.password, 10);
};

const User = model("user", userSchema);
module.exports = User;
