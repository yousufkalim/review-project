const express = require("express");
const router = express.Router();

const { getAll, login, signUp, getById } = require("../controllers/user");

// controllers

router.get("/", getAll);
router.post("/login", login);
router.post("/signup", signUp);
router.get("/getbyid/:id", getById);

module.exports = router;
