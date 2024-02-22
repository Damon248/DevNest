const mongoose = require("mongoose");
const config = require("config");
require("dotenv").config();
// config.get("mongoURI");
const dbUrl = process.env.MONGO_URI;
const connectToDB = async () => {
  try {
    await mongoose.connect(dbUrl);
    console.log("MongoDB is connected!");
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

module.exports = connectToDB;
