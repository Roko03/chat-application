const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Unesite svoje korisničko ime"],
      unique: true,
    },
    email: {
      type: String,
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        ,
        "Unesite valjan email",
      ],
      required: [true, "Unesite email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Unesite šifru"],
      minLength: [6, "Minimalan broj znakova je 6"],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

UserSchema.pre("save", async function (next) {
  let salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const UserModel =
  mongoose.models.User || mongoose.model("User", UserSchema, "user");

module.exports = UserModel;
