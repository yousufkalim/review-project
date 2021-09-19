const express = require("express");
const router = express.Router();

const {
  getAll,
  create,
  getById,
  getByRestaurantId,
} = require("../controllers/review");

// controllers

router.get("/", getAll);
router.get("/getbyid/:id", getById);
router.get("/getByRestaurantId/:id", getByRestaurantId);
router.post("/create", create);

module.exports = router;
