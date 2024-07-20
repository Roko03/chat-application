const mongoose = require("mongoose");

const ConservationMessageSchema = new mongoose.Schema(
  {
    conversation_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Conversation",
      require: true,
    },
    message_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
      require: true,
    },
  },
  { versionKey: false }
);

const ConservationMessageModel =
  mongoose.models.ConservationMessage ||
  mongoose.model(
    "ConservationMessage",
    ConservationMessageSchema,
    "conservation-message"
  );

module.exports = ConservationMessageModel;
