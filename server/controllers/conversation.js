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
      $lookup: {
        from: "user",
        localField: "messages.sender_id",
        foreignField: "_id",
        as: "senderDetails",
      },
    },
    {
      $unwind: {
        path: "$senderDetails",
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
            recipient: {
              _id: "$receiverDetails._id",
              username: "$receiverDetails.username",
              email: "$receiverDetails.email",
            },
            sender: {
              _id: "$senderDetails._id",
              username: "$senderDetails.username",
              email: "$senderDetails.email",
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

const makeConversation = async (req, res) => {
  const {
    session: { userId: userId },
    params: { id: targetId },
  } = req;

  const conversation = await Conversation.create({
    participants: [userId, targetId],
  });

  res.status(StatusCodes.CREATED).json(conversation);
};

module.exports = { getConversation, makeConversation };
