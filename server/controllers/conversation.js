const Conversation = require("../models/Conversation");

const getConversation = async (req, res) => {
  const {
    session: { userId: userId },
    params: { id: targetId },
  } = req;

  const conversation = await Conversation.findOne({
    participants: [userId, targetId],
  });

  res.status(201).json({ conversation });
};

const makeConversation = async (req, res) => {
  const {
    session: { userId: userId },
    params: { id: targetId },
  } = req;

  const conversation = await Conversation.create({
    participants: [userId, targetId],
  });

  res.status(201).json(conversation);
};

module.exports = { getConversation, makeConversation };
