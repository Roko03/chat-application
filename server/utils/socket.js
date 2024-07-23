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
const socketConversation = {};

const getSocketConversationId = (id) => {
  return socketConversation[id];
};

io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;
  const conversationId = socket.handshake.query.conversationId;
  if (userId != undefined) socketUsers[userId] = socket.id;
  if (conversationId != undefined) {
    socketConversation[conversationId] =
      socketConversation[conversationId] || [];
    socketConversation[conversationId].push(socket.id);
    socket.join(conversationId);
  }

  socket.on("disconnect", () => {
    delete socketUsers[userId];
    if (conversationId != undefined) {
      socketConversation[conversationId] = socketConversation[
        conversationId
      ].filter((id) => id !== socket.id);
      if (socketConversation[conversationId].length === 0)
        delete socketConversation[conversationId];
    }
  });
});

module.exports = { app, io, server_app, getSocketConversationId };
