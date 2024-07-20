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

ConversationSchema.pre("save", function (next) {
  this.participants.sort();
  next();
});

ConversationSchema.index({ participants: 1 }, { unique: true });

const ConversationModel =
  mongoose.models.Conversation ||
  mongoose.model("Conversation", ConversationSchema, "conversation");

module.exports = ConversationModel;
