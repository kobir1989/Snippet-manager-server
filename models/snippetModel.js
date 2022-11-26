const { Schema, model } = require("mongoose");
const User = require("./User");

const snippetSchema = new Schema(
  {
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    code: {
      type: String,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: User,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

const Snippet = model("Snippet", snippetSchema);
module.exports = Snippet;
