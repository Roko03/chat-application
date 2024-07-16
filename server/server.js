require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();
const connectDB = require("./utils/connectDB");
const session = require("express-session");
const MongoStore = require("connect-mongo");

const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

const authRouter = require("./router/auth");

app.use(express.json());

const sessionStore = MongoStore.create({
  mongoUrl: process.env.MONGO_URI,
  collectionName: "sessions",
  ttl: 24 * 60 * 60,
});

app.use(
  session({
    secret: "secret-key",
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: {
      httpOnly: true,
      maxAge: 3600000,
      secure: true,
    },
    maxAge: 24 * 60 * 60 * 1000,
    rolling: true,
  })
);

app.use("/api/v1/auth", authRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

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
