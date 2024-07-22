const express = require("express");
const app = express();
const http = require("http");
const server_app = http.createServer(app);
const { Server } = require("socket.io");

const io = new Server(server_app, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("message", (data) => {
    console.log(data);
  });

  socket.on("disconnect", () => {
    io.emit("message", "A user has left the chat");
  });
});

module.exports = { app, io, server_app };
