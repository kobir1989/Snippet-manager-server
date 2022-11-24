const { Schema, model } = require("mongoose");

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
  },
  {
    timestamps: true,
  }
);

const Snippet = model("Snippet", snippetSchema);
module.exports = Snippet;