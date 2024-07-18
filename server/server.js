require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();
const connectDB = require("./utils/connectDB");
const MongoStore = require("connect-mongo");
const cors = require("cors");

const session = require("express-session");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

const authRouter = require("./router/auth");

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

const sessionStore = MongoStore.create({
  mongoUrl: process.env.MONGO_URI,
  collectionName: "sessions",
  ttl: 80,
});

app.use(
  session({
    name: "sessionId",
    secret: "secret-key",
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: {
      sameSite: false,
      httpOnly: true,
      maxAge: 30 * 1000,
      secure: false,
    },
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
