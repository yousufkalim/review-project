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
  restaurant: { type: mongoose.Schema.Types.ObjectId, ref: "restaurant" },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
});

module.exports = mongoose.model("reviews", reviewsSchema);
