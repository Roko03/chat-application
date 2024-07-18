require("dotenv").config();
require("express-async-errors");

//security packages

const helmet = require("helmet");
const xss = require("xss-clean");
const rateLimiter = require("express-rate-limit");
const cors = require("cors");

const express = require("express");
const app = express();
const connectDB = require("./utils/connectDB");
const MongoStore = require("connect-mongo");

const session = require("express-session");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

const authRouter = require("./router/auth");

//middleware
app.set("trust proxy", 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000, //15 minutes,
    max: 100, //limit each IP to 100 request per windowMs
  })
);
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
app.use(helmet());
app.use(xss());

const sessionStore = MongoStore.create({
  mongoUrl: process.env.MONGO_URI,
  collectionName: "sessions",
  ttl: 2 * 24 * 60 * 60,
});

app.use(
  session({
    name: process.env.SECRET_SESSION_NAME,
    secret: process.env.SECRET_SESSION_KEY,
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: {
      sameSite: false,
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24,
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
