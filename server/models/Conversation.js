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
      ref: "ConversationMessage",
    },
  },
  { versionKey: false }
);

ConversationSchema.pre("save", function (next) {
  this.participants.sort();
  next();
});

const ConversationModel =
  mongoose.models.Conversation ||
  mongoose.model("Conversation", ConversationSchema, "conversation");

module.exports = ConversationModel;
