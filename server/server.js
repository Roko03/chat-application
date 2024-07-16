require("dotenv").config();

const express = require("express");
const app = express();
const connectDB = require("./utils/connectDB");

const notFoundMiddleware = require("./middleware/not-found");
const errorHandlewMiddleware = require("./middleware/error-handler");

app.get("/", (req, res) => {
  res.json("Ej");
});

app.use(notFoundMiddleware);
app.use(errorHandlewMiddleware);

const port = process.env.PORT || 3000;

const server = async () => {
  try {
    await connectDB();
    app.listen(port, console.log("Server is running..."));
  } catch (error) {
    console.log(error);
  }
};

server();
