const mongoose = require("mongoose");
const config = require("config");
const dbUrl = config.get("mongoURI");

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
