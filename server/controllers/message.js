const Conversation = require("../models/Conversation");
const ConversationMessage = require("../models/ConversationMessage");
const Message = require("../models/Message");
const User = require("../models/User");
const { UnauthenticatedError } = require("../errors");
const { StatusCodes } = require("http-status-codes");
const mongoose = require("mongoose");
const { io, getSocketId } = require("../utils/socket");

const createMessage = async (req, res) => {
  const {
    session: { userId: userId },
    params: { id: targetId },
    body: { message: messageText },
  } = req;

  const sender = await User.findOne({ _id: userId });
  const receiver = await User.findOne({ _id: targetId });

  if (!sender || !receiver) {
    throw new UnauthenticatedError("Korisnici ne postoje");
  }

  let conversation = await Conversation.findOne({
    participants: {
      $all: [
        new mongoose.Types.ObjectId(userId),
        new mongoose.Types.ObjectId(targetId),
      ],
    },
  });

  if (!conversation) {
    conversation = await Conversation.create({
      participants: [userId, targetId],
    });
  }

  const message = await Message.create({
    sender_id: userId,
    receiver_id: targetId,
    message: messageText,
  });

  const conservationMessage = await ConversationMessage.create({
    conversation_id: conversation._id,
    message_id: message._id,
  });

  io.to(getSocketId(targetId)).emit("newMessage", message);

  res
    .status(StatusCodes.OK)
    .json({ message: "Poruka poslana", message, conservationMessage });
};

module.exports = { createMessage };
