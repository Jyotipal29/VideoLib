const express = require("express");
const router = express.Router();
const { protect } = require("../middelwear/authMiddelwear");
const {
  addVideo,
  updateVideo,
  deleteVideo,
  getVideo,
  addView,
  trend,
  random,
  sub,
  getByTag,
  search,
} = require("../controllers/videoController");

//create a video

router.post("/", protect, addVideo);
router.put("/:id", protect, updateVideo);
router.delete("/:id", protect, deleteVideo);
router.get("/find/:id", getVideo);
router.put("/view/:id", addView);
router.get("/trend", trend);
router.get("/random", random);
router.get("/sub", protect, sub);
router.get("/search", search);
router.get("/tags", getByTag);

module.exports = router;
