const mongoose = require("mongoose");

const SessionSchema = new mongoose.Schema(
  {
    session_id: {
      type: String,
      require: true,
    },
    session_data: {
      type: String,
      require: true,
    },
    expireDate: {
      type: Date,
      default: () => new Date(+new Date() + 24 * 60 * 60 * 1000),
    },
  },
  {
    versionKey: false,
  }
);

SessionSchema.index({ expireDate: 1 }, { expireAfterSeconds: 0 });

const SessionModel =
  mongoose.models.Session ||
  mongoose.model("Session", SessionSchema, "session");

module.exports = SessionModel;
