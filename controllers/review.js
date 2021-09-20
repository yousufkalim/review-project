const db = require("../utils/db");
const Review = db.Review;
const ReviewReply = db.ReviewReply;

module.exports = {
  getAll,
  create,
  getById,
  getByRestaurantId,
  replied,
  _delete,
};

async function getAll(req, res) {
  try {
    let review = await Review.find().populate("user");
    res.json({ status: 200, review });
  } catch (err) {
    res.status(500).json(err);
  }
}

async function getById(req, res) {
  try {
    let review = await Review.findById(req.params.id);
    res.json({ status: 200, review });
  } catch (err) {
    res.status(500).json(err);
  }
}
async function replied(req, res) {
  try {
    let review = await Review.findById(req.params.id);
    review.reply = true;
    await review.save();
    res.json({ status: 200, review });
  } catch (err) {
    res.status(500).json(err);
  }
}

async function getByRestaurantId(req, res) {
  try {
    let review = await Review.findOne({ restaurant: req.params.id });
    res.json({ status: 200, review });
  } catch (err) {
    res.status(500).json(err);
  }
}

async function create(req, res) {
  try {
    const review = new Review(req.body);
    await review.save();
    res.json({ status: 200, review });
  } catch (err) {
    res.status(500).json(err);
  }
}

async function _delete(req, res) {
  try {
    if (await ReviewReply.findOne({ review: req.params.id })) {
      res.json({ status: 200, message: "Delete Reply First!" });
    } else {
      await Review.findByIdAndDelete(req.params.id);
      res.json({ status: 200, message: "Deleted successfully!" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
}
