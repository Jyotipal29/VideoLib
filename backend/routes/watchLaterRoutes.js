const express = require("express");
const { protect } = require("../middelwear/authMiddelwear");
const router = express.Router();
const {
  getWL,
  addToWL,
  removeFromWL,
} = require("../controllers/watchLaterController");
//REGISTER
router.get("/", protect, getWL);
router.post("/add", protect, addToWL);
//login
router.delete("/:id", protect, removeFromWL);

module.exports = router;
