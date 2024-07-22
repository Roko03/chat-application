const express = require("express");
const app = express();
const http = require("http");
const server_app = http.createServer(app);
const { Server } = require("socket.io");

const io = new Server(server_app, {
  cors: {
    origin: ["http://localhost:5173", "http://localhost:4173"],
    methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD"],
    credentials: true,
  },
});
const socketUsers = {};

const getSocketId = (id) => {
  return socketUsers[id];
};

io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;
  if (userId != undefined) socketUsers[userId] = socket.id;

  socket.on("disconnect", () => {
    io.emit("message", "A user has left the chat");
  });
});

module.exports = { app, io, server_app, getSocketId };
