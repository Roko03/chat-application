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
        as: "conservationMessages",
      },
    },
    {
      $unwind: {
        path: "$conservationMessages",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $lookup: {
        from: "message",
        localField: "conservationMessages.message_id",
        foreignField: "_id",
        as: "messages",
      },
    },
    {
      $unwind: {
        path: "$messages",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $lookup: {
        from: "user",
        localField: "messages.receiver_id",
        foreignField: "_id",
        as: "receiverDetails",
      },
    },
    {
      $unwind: {
        path: "$receiverDetails",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $group: {
        _id: "$_id",
        participants: { $first: "$participants" },
        messages: {
          $push: {
            _id: "$messages._id",
            sender_id: "$messages.sender_id",
            receiver_id: "$messages.receiver_id",
            message: "$messages.message",
            createdAt: "$messages.createdAt",
            updatedAt: "$messages.updatedAt",
            receiver: {
              _id: "$receiverDetails._id",
              username: "$receiverDetails.username",
              email: "$receiverDetails.email",
            },
          },
        },
      },
    },
    {
      $sort: {
        "messages.createdAt": 1,
      },
    },
  ]).exec();

  res.status(StatusCodes.OK).json({ conversation });
};

module.exports = { getConversation };
