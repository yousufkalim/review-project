const express = require("express");
const router = express.Router();

const {
  getAll,
  create,
  getById,
  getByReviewId,
  getByOwnerId,
  _delete,
} = require("../controllers/reviewReply");

// controllers

router.get("/", getAll);
router.get("/getbyid/:id", getById);
router.get("/getByReviewId/:id", getByReviewId);
router.get("/getByOwnerId/:id", getByOwnerId);
router.post("/create", create);
router.delete("/delete/:id", _delete);

module.exports = router;
