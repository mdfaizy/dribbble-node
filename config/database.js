require("dotenv").config()
const mongoose = require("mongoose");
exports.connect = () => {
  try {
    mongoose.connect(process.env.MONGODB_URL);
    console.log("connected to mongoDB");
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};
