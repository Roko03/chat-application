const mongoose = require("mongoose");

const ConversationSchema = new mongoose.Schema(
  {
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    chat_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ConservationMessage",
    },
  },
  { versionKey: false }
);

const ConversationModel =
  mongoose.models.Conversation ||
  mongoose.model("Conversation", ConversationSchema, "conversation");

module.exports = ConversationModel;
