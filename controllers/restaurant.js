const db = require("../utils/db");
const Restaurant = db.Restaurant;
const bcrypt = require("bcryptjs");
const passport = require("passport");
require("../utils/passportConfig")(passport);

module.exports = {
  getAll,
  create,
  getById,
};

async function getAll(req, res) {
  try {
    let restaurant = await Restaurant.find();
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

    const restaurant = new Restaurant(req.body);
    await restaurant.save();
    res.json({ status: 200, restaurant });
  } catch (err) {
    res.status(500).json(err);
  }
}
