const express = require("express");
const router = express.Router();
const multer = require("multer");

const {
  getAll,
  create,
  getById,
  getByOwnerId,
} = require("../controllers/restaurant");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/restaurants");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const uploadRestaurant = multer({ storage: storage });

// controllers

router.get("/", getAll);
router.get("/getbyid/:id", getById);
router.get("/getbyownerid/:id", getByOwnerId);
router.post("/create", uploadRestaurant.single("image"), create);

module.exports = router;
