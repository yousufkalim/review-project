const mongoose = require("mongoose");

const reviewsSchema = mongoose.Schema({
  star: {
    type: String,
    required: true,
  },
  comments: {
    type: String,
    required: true,
  },
  reply: { type: Boolean, default: false },
  user: { type: Schema.Types.ObjectId, ref: "user" },
});

module.exports = mongoose.model("reviews", reviewsSchema);
