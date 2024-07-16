const mongoose = require("mongoose");

const connectDB = () => {
  console.log("Database connected");
  mongoose.connect(process.env.MONGO_URI);
};

module.exports = connectDB;
