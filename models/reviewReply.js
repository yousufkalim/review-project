const mongoose = require("mongoose");

const reviewReplySchema = mongoose.Schema({
  reply: {
    type: String,
    required: true,
  },
  review: { type: mongoose.Schema.Types.ObjectId, ref: "review" },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
});

module.exports = mongoose.model("reviewReply", reviewReplySchema);
