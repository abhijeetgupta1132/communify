const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    author: { type: String, required: true },
    authorId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    text: { type: String, default: "" },
    image: { type: String, default: "" },
    likes: [String],
    comments: [
      {
        user: String,
        text: String,
        createdAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true },
);

module.exports = mongoose.model("Post", postSchema);
