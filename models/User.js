const { Schema, model } = require("mongoose");

const useSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
      minlength: 4,
      trim: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
      trim: true,
    },
    passwordHash: {
      type: String,
      require: true,
      minlength: 6,
    },
  },
  {
    timestamps: true,
  }
);

const User = model("User", useSchema);
module.exports = User;
