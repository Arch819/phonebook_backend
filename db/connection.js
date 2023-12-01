const mongoose = require("mongoose");

const { DB_HOST } = process.env;

const dbConnect = async () => {
  try {
    await mongoose.connect(DB_HOST);
    console.log("DB connecting");
  } catch (error) {
    console.log(error);
  }
};

module.exports = dbConnect;
