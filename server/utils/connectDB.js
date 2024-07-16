const mongoose = require("mongoose");

const connectDB = async () => {
  console.log("Database connected");
  return mongoose.connect(process.env.MONGO_URI);
};

module.exports = connectDB;
