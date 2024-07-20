const Conversation = require("../models/Conversation");
const mongoose = require("mongoose");
const { StatusCodes } = require("http-status-codes");

const getConversation = async (req, res) => {
  const {
    session: { userId: userId },
    params: { id: targetId },
  } = req;

  const conversation = await Conversation.aggregate([
    {
      $match: {
        participants: {
          $all: [
            new mongoose.Types.ObjectId(userId),
            new mongoose.Types.ObjectId(targetId),
          ],
        },
      },
    },
    {
      $lookup: {
        from: "conservation-message",
        localField: "_id",
        foreignField: "conversation_id",
        as: "conservationMessage",
      },
    },
    {
      $lookup: {
        from: "message",
        localField: "conservationMessage.message_id",
        foreignField: "_id",
        as: "messages",
      },
    },
    {
      $project: {
        conservationMessage: 0,
      },
    },
  ]).exec();

  res.status(StatusCodes.OK).json({ conversation });
};

module.exports = { getConversation };
