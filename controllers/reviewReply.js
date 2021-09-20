const db = require("../utils/db");
const ReviewReply = db.ReviewReply;

module.exports = {
  getAll,
  create,
  getById,
  getByReviewId,
  getByOwnerId,
  _delete,
};

async function getAll(req, res) {
  try {
    let reviewReply = await ReviewReply.find().populate("owner");
    res.json({ status: 200, reviewReply });
  } catch (err) {
    res.status(500).json(err);
  }
}

async function getById(req, res) {
  try {
    let reviewReply = await ReviewReply.findById(req.params.id);
    res.json({ status: 200, reviewReply });
  } catch (err) {
    res.status(500).json(err);
  }
}

async function getByReviewId(req, res) {
  try {
    let reviewReply = await ReviewReply.findOne({ review: req.params.id });
    res.json({ status: 200, reviewReply });
  } catch (err) {
    res.status(500).json(err);
  }
}

async function getByOwnerId(req, res) {
  try {
    let reviewReply = await ReviewReply.find({ owner: req.params.id });
    res.json({ status: 200, reviewReply });
  } catch (err) {
    res.status(500).json(err);
  }
}

async function create(req, res) {
  try {
    const reviewReply = new ReviewReply(req.body);
    await reviewReply.save();
    res.json({ status: 200, reviewReply });
  } catch (err) {
    res.status(500).json(err);
  }
}

async function _delete(req, res) {
  try {
    await ReviewReply.findByIdAndDelete(req.params.id);
    res.json({ status: 200, message: "Deleted successfully!" });
  } catch (err) {
    res.status(500).json(err);
  }
}
