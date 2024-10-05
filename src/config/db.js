const mongoose = require("mongoose");
const { mongodbURL } = require("../secret");
require("dotenv").config();

const connectDB = async () => {
  try {
    await mongoose.connect(mongodbURL, { dbName: process.env.DB_NAME });
    console.log("Connection to DB is successful");

    mongoose.connection.on("error", (error) => {
      console.error("DB connection error: ", error);
    });
  } catch (error) {
    console.error("Couldn't connect to DB: ", error.toString());
  }
};

module.exports = connectDB;
