const express = require("express");
const router = express.Router();
const {
  addComment,
  deleteComment,
  getComment,
} = require("../controllers/commentControllers");
const { protect } = require("../middelwear/authMiddelwear");

router.post("/", protect, addComment);
router.delete("/:id", protect, deleteComment);
router.get("/:videoId", getComment);

module.exports = router;
