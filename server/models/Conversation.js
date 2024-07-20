const mongoose = require("mongoose");

const ConversationSchema = new mongoose.Schema(
  {
    first_participate: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
    second_participate: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
    chat_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ConservationMessage",
      require: true,
    },
  },
  { versionKey: false }
);

const ConversationModel =
  mongoose.models.Conversation ||
  mongoose.model("Conversation", ConversationSchema, "conversation");

module.exports = ConversationModel;
