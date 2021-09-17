const mongoose = require("mongoose");

const reviewReplySchema = mongoose.Schema({
  reply: {
    type: String,
    required: true,
  },
  comments: {
    type: String,
    required: true,
  },
  owner: { type: Schema.Types.ObjectId, ref: "review" },
});

module.exports = mongoose.model("reviewReply", reviewReplySchema);
