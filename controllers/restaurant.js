const db = require("../utils/db");
const Restaurant = db.Restaurant;
const Review = db.Review;
const passport = require("passport");
require("../utils/passportConfig")(passport);

module.exports = {
  getAll,
  create,
  getById,
  getByOwnerId,
  _delete,
};

async function getAll(req, res) {
  try {
    let restaurant = await Restaurant.find();
    res.json({ status: 200, restaurant });
  } catch (err) {
    res.status(500).json(err);
  }
}

async function getByOwnerId(req, res) {
  try {
    let restaurant = await Restaurant.find({ owner: req.params.id });
    res.json({ status: 200, restaurant });
  } catch (err) {
    res.status(500).json(err);
  }
}

async function getById(req, res) {
  try {
    let restaurant = await Restaurant.findById(req.params.id);
    res.json({ status: 200, restaurant });
  } catch (err) {
    res.status(500).json(err);
  }
}

async function create(req, res) {
  try {
    if (await Restaurant.findOne({ name: req.body.name })) {
      throw 'Restaurant "' + req.body.name + '" already exist';
    }

    if (req.file) {
      req.body = { ...req.body, image: req.file.path };
    }
    console.log("request: ", req.body.image);

    const restaurant = new Restaurant(req.body);
    await restaurant.save();
    res.json({ status: 200, restaurant });
  } catch (err) {
    res.status(500).json(err);
  }
}

async function _delete(req, res) {
  try {
    if (await Review.findOne({ restaurant: req.params.id })) {
      res.json({ status: 200, message: "Delete Review First!" });
    } else {
      await Restaurant.findByIdAndDelete(req.params.id);
      res.json({ status: 200, message: "Deleted successfully!" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
}
